// models/Director.js
const mongoose = require('mongoose');

const DirectorSchema = new mongoose.Schema({
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

  // Business Unit fields
  buid: { type: String, required: true },
  buname: { type: String, required: true },

  region: String,
  specialitytype: String,

  hiredate: Date,
  status: {
    type: String,
    enum: ['active', 'suspended', 'terminated', 'leave'],
    default: 'active'
  },

  // Reports to a Managing Director
  managerid: { type: mongoose.Schema.Types.ObjectId, ref: 'ManagingDirector' }

}, { timestamps: true });

module.exports = mongoose.model('Director', DirectorSchema);
