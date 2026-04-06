// models/SalesManager.js
const mongoose = require('mongoose');

// Embedded salesperson schema
const SalespersonSubSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  firstname: String,

  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,

  phone: String,
  cell: String,
  btn: String,

  managerid: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesManager' },

  region: String,
  bu: String,
  specialitytype: String,

  hiredate: Date,
  status: {
    type: String,
    enum: ['active', 'suspended', 'terminated', 'leave'],
    default: 'active'
  }
}, { _id: true });


// SalesManager schema with ALL fields explicitly defined
const SalesManagerSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  firstname: String,

  // Address fields
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,

  // Contact
  phone: String,
  cell: String,

  // Business fields
  region: String,
  bu: String,
  specialitytype: String,

  hiredate: Date,
  status: {
    type: String,
    enum: ['active', 'suspended', 'terminated', 'leave'],
    default: 'active'
  },

  // Manager‑specific fields
  defaultbranch: String,
  defaultbranchid: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },

  // Unique field: embedded list of salespersons
  salespersonlist: [SalespersonSubSchema]

}, { timestamps: true });

module.exports = mongoose.model('SalesManager', SalesManagerSchema);
