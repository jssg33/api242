const mongoose = require("mongoose");

const InvoiceLineItemSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: Number,
      required: true
    },

    productId: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    quantity: {
      type: Number,
      required: true,
      default: 1
    },

    listCost: {
      type: Number,
      required: true
    },

    unitCost: {
      type: Number,
      required: true
    },

    discountAmount: {
      type: Number,
      default: 0
    },

    taxAmount: {
      type: Number,
      default: 0
    },

    lineSubtotal: {
      type: Number,
      default: 0
    },

    lineTotal: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("InvoiceLineItem", InvoiceLineItemSchema);
