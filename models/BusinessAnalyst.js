// models/BusinessAnalyst.js
const mongoose = require('mongoose');

const BusinessAnalystSchema = new mongoose.Schema({
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
  btn: String,

  managerid: { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessDirector' },

  region: String,
  bu: String,
  specialitytype: String,

  hiredate: Date,
  status: {
    type: String,
    enum: ['active', 'suspended', 'terminated', 'leave'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('BusinessAnalyst', BusinessAnalystSchema);
