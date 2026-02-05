const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  paymentId: {
    type: Number,
    required: true
  },
  bookingId: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  cardType: {
    type: String
  },
  cardLast4: {
    type: String
  },
  cardExpDate: {
    type: String
  },
  amountPaid: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  useridasstring: {
    type: String
  },
  transtype: {
    type: String
  },
  refundTransactionId: {
    type: String
  },
  amountRefunded: {
    type: Number,
    default: 0
  },
  fullname: {
    type: String
  },
  userid: {
    type: Number,
    required: true
  },
  possource: {
    type: String
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);
