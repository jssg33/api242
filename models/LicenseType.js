// models/LicenseType.js
const mongoose = require('mongoose');
const Counter = require('./Counter');

const LicenseTypeSchema = new mongoose.Schema(
  {
    LicenseTypeID: {
      type: Number,
      unique: true
    },
    LicenseTypeName: {
      type: String,
      required: true,
      trim: true
    },
    Description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model('LicenseType', LicenseTypeSchema);
