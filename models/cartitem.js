const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      default: 0
    },

    cartid: {
      type: Number,
      required: true
    },

    cartitemdate: {
      type: Date
    },

    itemvendor: {
      type: String,
      trim: true
    },

    itemdescription: {
      type: String,
      trim: true
    },

    itemextendedprice: {
      type: Number,
      default: 0
    },

    itemqty: {
      type: Number,
      default: 0
    },

    itemtotals: {
      type: Number,
      default: 0
    },

    salescatid: {
      type: Number,
      default: 0
    },

    productid: {
      type: String,
      trim: true
    },

    shopid: {
      type: String,
      trim: true
    },

    // replaces parkid
    productidstring: {
      type: String,
      trim: true
    },

    subtotal: {
      type: Number,
      default: 0
    },

    createdDate: {
      type: Date
    },

    resStart: {
      type: Date
    },

    resEnd: {
      type: Date
    },

    qrcodeurl: {
      type: String,
      trim: true
    },

    reservationcode: {
      type: String,
      trim: true
    },

    memberid: {
      type: String,
      trim: true
    },

    rewardsprovider: {
      type: String,
      trim: true
    },

    adults: {
      type: Number,
      default: 0
    },

    children: {
      type: Number,
      default: 0
    },

    statetaxpercent: {
      type: Number,
      default: 0
    },

    statetaxauth: {
      type: String,
      trim: true
    },

    ustaxpercent: {
      type: Number,
      default: 0
    },

    ustaxtotal: {
      type: Number,
      default: 0
    },

    statetaxtotal: {
      type: Number,
      default: 0
    },

    itemsubtotal: {
      type: Number,
      default: 0
    },

    // replaces parkname
    productname: {
      type: String,
      trim: true
    },

    userid: {
      type: Number,
      default: 0
    },

    numDays: {
      type: Number,
      default: 0
    },

    // replaces parkidasstring
    productidasstring: {
      type: String,
      trim: true
    },

    // replaces parkGuid
    productGuid: {
      type: String,
      trim: true
    },

    possource: {
      type: String,
      trim: true
    },

    useridstring: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartItem", cartItemSchema);
