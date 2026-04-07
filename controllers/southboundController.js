const fs = require("fs");
const path = require("path");

const Payment = require("../models/paymentModel");
const CreditCard = require("../models/cards");
const Invoice = require("../models/invoiceModel");
const InvoiceLineItem = require("../models/invoiceLineItemModel");
const Reservation = require("../models/reservationModel");

// Today's date in ISO format
const today = () => new Date().toISOString();

// Random generators
const randInt = (min = 1000, max = 999999) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randString = (len = 12) =>
  [...Array(len)].map(() => Math.random().toString(36)[2]).join("");

// Random default maps
const RANDOM_DEFAULTS = {
  payments: {
    paymentId: () => randInt(),
    bookingId: () => randInt(),
    paymentMethod: () => "credit",
    amountPaid: () => Math.random() * 100,
    paymentDate: () => today(),        // TODAY
    transactionId: () => "TXN-" + randString(10),
    userid: () => randInt()
  },

  cards: {
    cardId: () => randInt(),
    uid: () => randString(8),
    cardType: () => "credit",
    cardVendor: () => "Visa",
    cardLast4: () => String(randInt(1000, 9999)),
    cardExpDate: () => "12/30",
    billingZip: () => String(randInt(10000, 99999)),
    fullname: () => "Unknown User",
    fullcardnumber: () => String(randInt(4000000000000000, 4999999999999999)),
    userid: () => randInt()
  },

  invoices: {
    invoiceId: () => randInt(),
    customerId: () => "CUST-" + randInt(),
    accountId: () => "ACCT-" + randInt(),
    subAccountId: () => "SUB-" + randInt(),
    subtotal: () => Math.random() * 100,
    taxTotal: () => Math.random() * 10,
    discountTotal: () => 0,
    grandTotal: () => Math.random() * 110,
    invoiceDate: () => today()         // TODAY
  },

  invoiceLineItems: {
    invoiceId: () => randInt(),
    productId: () => randString(24),
    description: () => "Item " + randString(5),
    quantity: () => randInt(1, 5),
    unitCost: () => randInt(10, 200),
    listCost: () => randInt(10, 200),
    lineTotal: () => randInt(10, 200)
  },

  reservations: {
    reservationId: () => randInt(),
    parkId: () => randInt(),
    userid: () => randInt(),
    resStart: () => today(),           // TODAY
    resEnd: () => today(),             // TODAY
    reservationstatus: () => "confirmed",
    reservationtype: () => "camping",
    cartid: () => "CART-" + randInt(),
    parkName: () => "Park " + randString(5),
    transactionId: () => "TXN-" + randString(10),
    totalAmount: () => randInt(10, 200),
    customerBillingName: () => "Guest " + randString(5),
    quantityChildren: () => randInt(0, 3),
    quantityAdults: () => randInt(1, 5),
    creditCardExpDate: () => "12/30",
    creditCardLast4: () => String(randInt(1000, 9999)),
    creditCardType: () => "Visa",
    billingTelephoneNumber: () => String(randInt(1000000000, 9999999999)),
    uid: () => randString(10),
    bookingId: () => randInt()
  }
};

// Normalizer
const normalize = (obj, defaults) => {
  const normalized = {};
  for (const key in defaults) {
    normalized[key] = obj[key] ?? defaults[key]();
  }
  return normalized;
};

// Build structured error objects
const buildError = (section, err, payload) => ({
  section,
  message: err?.message || "Unknown error",
  name: err?.name || null,
  stack: err?.stack || null,
  payload
});

exports.processSouthboundCart = async (req, res) => {
  const { payments, cards, invoices, invoiceLineItems, reservations } = req.body;

  const result = {
    payments: [],
    cards: [],
    invoices: [],
    invoiceLineItems: [],
    reservations: [],
    errors: []
  };

  // PAYMENTS
  try {
    if (payments?.length > 0) {
      const normalized = payments.map(p => normalize(p, RANDOM_DEFAULTS.payments));
      result.payments = await Payment.insertMany(normalized);
    }
  } catch (err) {
    result.errors.push(buildError("payments", err, payments));
  }

  // CARDS
  try {
    if (cards?.length > 0) {
      const normalized = cards.map(c => normalize(c, RANDOM_DEFAULTS.cards));
      result.cards = await CreditCard.insertMany(normalized);
    }
  } catch (err) {
    result.errors.push(buildError("cards", err, cards));
  }

  // INVOICES
  try {
    if (invoices?.length > 0) {
      const normalized = invoices.map(i => {
        const n = normalize(i, RANDOM_DEFAULTS.invoices);
        n.invoiceDate = today(); // FORCE TODAY
        return n;
      });
      result.invoices = await Invoice.insertMany(normalized);
    }
  } catch (err) {
    result.errors.push(buildError("invoices", err, invoices));
  }

  // INVOICE LINE ITEMS
  try {
    if (invoiceLineItems?.length > 0) {
      const normalized = invoiceLineItems.map(i => normalize(i, RANDOM_DEFAULTS.invoiceLineItems));
      result.invoiceLineItems = await InvoiceLineItem.insertMany(normalized);
    }
  } catch (err) {
    result.errors.push(buildError("invoiceLineItems", err, invoiceLineItems));
  }

  // RESERVATIONS
  try {
    if (reservations?.length > 0) {
      const normalized = reservations.map(r => {
        const n = normalize(r, RANDOM_DEFAULTS.reservations);
        n.resStart = today();  // FORCE TODAY
        n.resEnd = today();    // FORCE TODAY
        return n;
      });
      result.reservations = await Reservation.insertMany(normalized);
    }
  } catch (err) {
    result.errors.push(buildError("reservations", err, reservations));
  }

  return res.status(200).json({ Southbound: result });
};
