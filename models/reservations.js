const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  bookingId: {
    type: Number,
    required: true
  },
  uid: {
    type: String,
    required: true
  },
  billingTelephoneNumber: {
    type: String,
    required: true
  },
  creditCardType: {
    type: String,
    required: true
  },
  creditCardLast4: {
    type: String,
    required: true
  },
  creditCardExpDate: {
    type: String,
    required: true
  },
  quantityAdults: {
    type: Number,
    required: true
  },
  quantityChildren: {
    type: Number,
    required: true
  },
  customerBillingName: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  parkId: {
    type: Number,
    required: true
  },
  parkName: {
    type: String,
    required: true
  },
  cartid: {
    type: String,
    required: true
  },
  reservationtype: {
    type: String,
    required: true
  },
  reservationstatus: {
    type: String,
    required: true
  },
  reversetransactionid: {
    type: String
  },
  cancellationrefund: {
    type: Number,
    default: 0
  },
  cartDetailsJson: {
    type: String
  },
  totalcartitems: {
    type: Number,
    default: 0
  },
  reference: {
    type: String
  },
  subReference: {
    type: String
  },
  adults: {
    type: Number,
    default: 0
  },
  children: {
    type: Number,
    default: 0
  },
  resStart: {
    type: Date,
    required: true
  },
  resEnd: {
    type: Date,
    required: true
  },
  tentsites: {
    type: Number,
    default: 0
  },
  parkGuid: {
    type: String
  },
  numDays: {
    type: Number,
    default: 0
  },
  possource: {
    type: String
  },
  userid: {
    type: Number,
    required: true
  },
  emailnoticeaddress: {
    type: String
  }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
