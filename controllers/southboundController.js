const fs = require("fs");
const path = require("path");

const Payment = require("../models/paymentModel");
const CreditCard = require("../models/cards");
const Invoice = require("../models/invoiceModel");
const InvoiceLineItem = require("../models/invoiceLineItemModel");
const Reservation = require("../models/reservationModel");

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
  // 1. WRITE RAW CART TO DISK
  //
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `${timestamp}.json`;
    const filePath = path.join(__dirname, "..", "Data", filename);

    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2), "utf8");
    console.log(`Southbound cart written to ${filePath}`);
  } catch (err) {
    console.error("Failed to write cart to disk:", err);
    result.errors.push({ section: "disk", error: err.message });
  }

  //
  // 2. SAVE PAYMENTS
  //
  try {
    if (payments?.length > 0) {
      result.payments = await Payment.insertMany(payments);
    }
  } catch (err) {
    result.errors.push({ section: "payments", error: err.message });
  }

  //
  // 3. SAVE CREDIT CARDS - CHANGED TO OPTIONAL AS ADDING CARDS HITS ANOTHER ENDPOINT, BUT WE COULD IN THE FUTURE SEND THE ENTIRE CARD IN THE PAYLOAD.
  //
try {
  if (Array.isArray(cards) && cards.length > 0) {
    // Only insert if the objects actually contain required fields
    const validCards = cards.filter(c =>
      c.cardId &&
      c.uid &&
      c.cardType &&
      c.cardVendor &&
      c.cardLast4 &&
      c.cardExpDate &&
      c.billingZip &&
      c.fullname &&
      c.fullcardnumber &&
      c.userid
    );

    if (validCards.length > 0) {
      result.cards = await CreditCard.insertMany(validCards);
    }
  }
} catch (err) {
  result.errors.push({ section: "cards", error: err.message });
}

  //
  // 4. SAVE INVOICES (Sales Order Headers)
  //
  try {
    if (invoices?.length > 0) {
      result.invoices = await Invoice.insertMany(invoices);
    }
  } catch (err) {
    result.errors.push({ section: "invoices", error: err.message });
  }

  //
  // 5. SAVE INVOICE LINE ITEMS
  //
  try {
    if (invoiceLineItems?.length > 0) {
      result.invoiceLineItems = await InvoiceLineItem.insertMany(invoiceLineItems);
    }
  } catch (err) {
    result.errors.push({ section: "invoiceLineItems", error: err.message });
  }

  //
  // 6. SAVE RESERVATIONS
  //
  try {
    if (reservations?.length > 0) {
      result.reservations = await Reservation.insertMany(reservations);
    }
  } catch (err) {
    result.errors.push({ section: "reservations", error: err.message });
  }

  //
  // 7. RETURN UNIFIED RESPONSE
  //
  return res.status(200).json({
    Southbound: result
  });
};
