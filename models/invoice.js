const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: Number,
      required: true
    },

    customerId: {
      type: String,
      required: true,
      trim: true
    },

    accountId: {
      type: String,
      required: true,
      trim: true
    },

    subAccountId: {
      type: String,
      required: true,
      trim: true
    },

    // -----------------------------
    // Bill To Address
    // -----------------------------
    billToAddress1: { type: String, trim: true },
    billToAddress2: { type: String, trim: true },
    billToCity: { type: String, trim: true },
    billToState: { type: String, trim: true },
    billToPostalZip: { type: String, trim: true },
    billToCountry: { type: String, trim: true },

    // -----------------------------
    // Ship To Address
    // -----------------------------
    shipToAddress1: { type: String, trim: true },
    shipToAddress2: { type: String, trim: true },
    shipToCity: { type: String, trim: true },
    shipToState: { type: String, trim: true },
    shipToPostalZip: { type: String, trim: true },
    shipToCountry: { type: String, trim: true },

    // -----------------------------
    // Invoice Totals
    // -----------------------------
    subtotal: { type: Number, default: 0 },
    taxTotal: { type: Number, default: 0 },
    discountTotal: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },

    // -----------------------------
    // Metadata
    // -----------------------------
    invoiceDate: { type: Date, required: true },
    dueDate: { type: Date },
    status: {
      type: String,
      enum: ["draft", "open", "paid", "void"],
      default: "draft"
    },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
