// models/QuotationLine.js
const mongoose = require("mongoose");

const QuotationLineSchema = new mongoose.Schema(
  {
    quotationId: { type: Number, required: true },

    productId: String,
    description: String,

    quantity: Number,
    listCost: Number,
    unitCost: Number,

    discountAmount: Number,
    taxAmount: Number,

    lineSubtotal: Number,
    lineTotal: Number,

    // 🔥 NEW optional fields for filtering
    salespersonId: { type: String, required: false },
    customerId: { type: String, required: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuotationLine", QuotationLineSchema);

