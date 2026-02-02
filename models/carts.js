const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      default: 0
    },

    cartId: {
      type: Number,
      required: true
    },

    uid: {
      type: String,
      trim: true
    },

    // Replaces parkId
    licenseId: {
      type: Number,
      default: 0
    },

    itemType: {
      type: String,
      trim: true
    },

    itemDescription: {
      type: String,
      trim: true
    },

    quantity: {
      type: Number,
      default: 0
    },

    unitPrice: {
      type: Number,
      default: 0
    },

    totalPrice: {
      type: Number,
      default: 0
    },

    dateAdded: {
      type: String,
      trim: true
    },

    isCheckedOut: {
      type: Number,
      default: 0
    },

    paymentid: {
      type: String,
      trim: true
    },

    bookinginfo: {
      type: String,
      trim: true
    },

    totalcartitems: {
      type: Number,
      default: 0
    },

    multipleitems: {
      type: Number,
      default: 0
    },

    johnstotals: {
      type: Number,
      default: 0
    },

    transactiontotal: {
      type: Number,
      default: 0
    },

    // Replaces parkname
    productname: {
      type: String,
      trim: true
    },

    resStart: {
      type: Date
    },

    resEnd: {
      type: Date
    },

    adults: {
      type: Number,
      default: 0
    },

    children: {
      type: Number,
      default: 0
    },

    // Replaces parkGuid
    productGuid: {
      type: String,
      trim: true
    },

    possource: {
      type: String,
      trim: true
    },

    userid: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
