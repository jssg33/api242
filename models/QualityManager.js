// models/QualityManager.js
const mongoose = require('mongoose');
const QualityAnalystSchema = require('./QualityAnalyst').schema;

const QualityManagerSchema = new mongoose.Schema({
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

  analystlist: [QualityAnalystSchema]

}, { timestamps: true });

module.exports = mongoose.model('QualityManager', QualityManagerSchema);
