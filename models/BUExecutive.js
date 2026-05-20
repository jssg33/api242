// models/BUExecutive.js
const mongoose = require('mongoose');

const BUExecutiveSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  firstname: String,

  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,

  phone: String,
  cell: String,

  // Executive Title Enum
  title: {
    type: String,
    enum: [
      'President',
      'VicePresident',
      'ExecutiveVicePresident',
      'Partner',
      'ManagingPartner',
      'Other'
    ],
    required: true
  },

  // Band Level (1 = top)
  band: {
    type: Number,
    required: true,
    default: 1
  },

  // Business Unit Ownership
  buid: { type: String, required: true },
  buname: { type: String, required: true },

  // Organization Unit (Division or Main Corp)
  orgunitid: { type: String, required: true },
  orgunitname: { type: String, required: true },

  // Polymorphic Direct Reports
  directreports: [
    {
      refModel: { type: String, required: true }, // "BUExecutive", "Director", "ManagingDirector"
      refId: { type: mongoose.Schema.Types.ObjectId, required: true }
    }
  ],

  region: String,
  specialitytype: String,

  hiredate: Date,
  status: {
    type: String,
    enum: ['active', 'suspended', 'terminated', 'leave'],
    default: 'active'
  }

}, { timestamps: true });

module.exports = mongoose.model('BUExecutive', BUExecutiveSchema);
