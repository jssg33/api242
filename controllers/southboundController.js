const fs = require("fs");
const path = require("path");

const Payment = require("../models/paymentModel");
const CreditCard = require("../models/cards");
const Invoice = require("../models/invoiceModel");
const InvoiceLineItem = require("../models/invoiceLineItemModel");
const Reservation = require("../models/reservationModel");

//
// DEFAULT FIELD MAPS
//
const REQUIRED = {
  payments: {
    paymentId: null,
    bookingId: null,
    paymentMethod: "unknown",
    amountPaid: 0,
    paymentDate: new Date().toISOString(),
    transactionId: "none",
    userid: null
  },

  cards: {
    cardId: null,
    uid: "unknown",
    cardType: "unknown",
    cardVendor: "unknown",
    cardLast4: "0000",
    cardExpDate: "01/30",
    billingZip: "00000",
    fullname: "Unknown",
    fullcardnumber: "0000000000000000",
    userid: null
  },

  invoices: {
    invoiceId: null,
    customerId: "unknown",
    accountId: "unknown",
    subAccountId: "unknown",
    subtotal: 0,
    taxTotal: 0,
    discountTotal: 0,
    grandTotal: 0,
    invoiceDate: new Date().toISOString()
  },

  invoiceLineItems: {
    invoiceId: null,
    productId: "unknown",
    description: "",
    quantity: 0,
    unitCost: 0,
    listCost: 0,
    lineTotal: 0
  },

  reservations: {
    reservationId: null,
    parkId: null,
    userid: null,
    resStart: new Date().toISOString(),
    resEnd: new Date().toISOString(),
    reservationstatus: "unknown",
    reservationtype: "unknown",
    cartid: "none",
    parkName: "unknown",
    transactionId: "none",
    totalAmount: 0,
    customerBillingName: "unknown",
    quantityChildren: 0,
    quantityAdults: 0,
    creditCardExpDate: "01/30",
    creditCardLast4: "0000",
    creditCardType: "unknown",
    billingTelephoneNumber: "0000000000",
    uid: "unknown",
    bookingId: null
  }
};

//
// NORMALIZER
//
const normalize = (obj, defaults) => {
  const normalized = { ...defaults };
  for (const key in defaults) {
    normalized[key] = obj[key] ?? defaults[key];
  }
  return normalized;
};

//
// MAIN CONTROLLER
//
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

  //
  // 1. WRITE RAW CART TO DISK (RESTORED)
  //
  /*try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `${timestamp}.json`;
    const filePath = path.join(__dirname, "..", "Data", filename);

    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2), "utf8");
    console.log(`Southbound cart written to ${filePath}`);
  } catch (err) {
    console.error("Failed to write cart to disk:", err);
    result.errors.push({ section: "disk", error: err.message });
  }*/

  //
  // 2. PAYMENTS
  //
  try {
    if (Array.isArray(payments) && payments.length > 0) {
      const normalized = payments.map(p => normalize(p, REQUIRED.payments));
      result.payments = await Payment.insertMany(normalized);
    }
  } catch (err) {
    result.errors.push({ section: "payments", error: err.message });
  }

  //
  // 3. CARDS
  //
  try {
    if (Array.isArray(cards) && cards.length > 0) {
      const normalized = cards.map(c => normalize(c, REQUIRED.cards));
      result.cards = await CreditCard.insertMany(normalized);
    }
  } catch (err) {
    result.errors.push({ section: "cards", error: err.message });
  }

  //
  // 4. INVOICES
  //
  try {
    if (Array.isArray(invoices) && invoices.length > 0) {
      const normalized = invoices.map(i => normalize(i, REQUIRED.invoices));
      result.invoices = await Invoice.insertMany(normalized);
    }
  } catch (err) {
    result.errors.push({ section: "invoices", error: err.message });
  }

  //
  // 5. INVOICE LINE ITEMS
  //
  try {
    if (Array.isArray(invoiceLineItems) && invoiceLineItems.length > 0) {
      const normalized = invoiceLineItems.map(i => normalize(i, REQUIRED.invoiceLineItems));
      result.invoiceLineItems = await InvoiceLineItem.insertMany(normalized);
    }
  } catch (err) {
    result.errors.push({ section: "invoiceLineItems", error: err.message });
  }

  //
  // 6. RESERVATIONS
  //
  try {
    if (Array.isArray(reservations) && reservations.length > 0) {
      const normalized = reservations.map(r => normalize(r, REQUIRED.reservations));
      result.reservations = await Reservation.insertMany(normalized);
    }
  } catch (err) {
    result.errors.push({ section: "reservations", error: err.message });
  }

  //
  // 7. RETURN RESPONSE
  //
  return res.status(200).json({
    Southbound: result
  });
};
