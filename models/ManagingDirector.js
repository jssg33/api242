// models/ManagingDirector.js
const mongoose = require('mongoose');

const ManagingDirectorSchema = new mongoose.Schema({
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
  specialitytype: String,

  hiredate: Date,
  status: {
    type: String,
    enum: ['active', 'suspended', 'terminated', 'leave'],
    default: 'active'
  },

  // Managing Directors manage BOTH:
  directorlist: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Director' }
  ],

  businessdirectorlist: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'BusinessDirector' }
  ]

}, { timestamps: true });

module.exports = mongoose.model('ManagingDirector', ManagingDirectorSchema);
