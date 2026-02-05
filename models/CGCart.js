const mongoose = require("mongoose");

const CGCartItemParkSchema = new mongoose.Schema({
  id: String,
  parkName: String,
  location: String,
  description: String,
  adultPrice: Number,
  childPrice: Number,
  imageUrl: String,
  reviews: [String]
});

const CGCartItemSchema = new mongoose.Schema({
  park: CGCartItemParkSchema,
  numAdults: Number,
  numChildren: Number,
  numDays: Number,
  resStart: String,
  resEnd: String,
  totalPrice: Number
});

const CGCartSchema = new mongoose.Schema(
  {
    userId: Number,
    uid: String,
    transactionTotal: Number,
    paymentId: String,
    resStart: String,
    resEnd: String,
    items: [CGCartItemSchema],
    useremail: String,
    parkId: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("CGCart", CGCartSchema);
