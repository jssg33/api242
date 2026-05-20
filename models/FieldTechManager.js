// models/FieldTechManager.js
const mongoose = require('mongoose');
const FieldTechSchema = require('./FieldTech').schema;

const FieldTechManagerSchema = new mongoose.Schema({
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

  region: String,
  bu: String,
  specialitytype: String,

  hiredate: Date,
  status: {
    type: String,
    enum: ['active', 'suspended', 'terminated', 'leave'],
    default: 'active'
  },

  defaultbranch: String,
  defaultbranchid: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },

  techlist: [FieldTechSchema]

}, { timestamps: true });

module.exports = mongoose.model('FieldTechManager', FieldTechManagerSchema);
