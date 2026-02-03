const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  cardId: {
    type: Number,
    required: true
  },
  uid: {
    type: String,
    required: true
  },
  cardType: {
    type: String,
    required: true
  },
  cardVendor: {
    type: String,
    required: true
  },
  cardLast4: {
    type: String,
    required: true
  },
  cardExpDate: {
    type: String,
    required: true
  },
  billingZip: {
    type: String,
    required: true
  },
  isActive: {
    type: Number,
    default: 0
  },
  cardbtn: {
    type: String
  },
  fullname: {
    type: String,
    required: true
  },
  fullcardnumber: {
    type: String,
    required: true
  },
  userid: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Card', CardSchema);
