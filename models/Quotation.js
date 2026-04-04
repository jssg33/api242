// models/Quotation.js
const mongoose = require("mongoose");

const QuotationSchema = new mongoose.Schema(
  {
    quotationId: { type: Number, required: true, unique: true },

    customerId: String,
    accountId: String,
    subAccountId: String,

    billToAddress1: String,
    billToAddress2: String,
    billToCity: String,
    billToState: String,
    billToPostalZip: String,
    billToCountry: String,

    shipToAddress1: String,
    shipToAddress2: String,
    shipToCity: String,
    shipToState: String,
    shipToPostalZip: String,
    shipToCountry: String,

    subtotal: Number,
    taxTotal: Number,
    discountTotal: Number,
    grandTotal: Number,

    quotationDate: Date,
    expiryDate: Date,

    status: {
      type: String,
      enum: ["draft", "sent", "accepted", "rejected", "expired"],
      default: "draft"
    },

    notes: String,

    // 🔥 Sales hierarchy fields (optional for now)
    salespersonId: { type: String, required: false },
    managerId: { type: String, required: false },
    businessUnit: { type: String, required: false },
    region: { type: String, required: false },
    branch: { type: String, required: false },

    // Line items
    lines: [{ type: mongoose.Schema.Types.ObjectId, ref: "QuotationLine" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quotation", QuotationSchema);
