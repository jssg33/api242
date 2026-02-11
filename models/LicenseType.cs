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

// Auto-increment LicenseTypeID before saving
LicenseTypeSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'LicenseTypeID' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.LicenseTypeID = counter.seq;
  }
  next();
});

module.exports = mongoose.model('LicenseType', LicenseTypeSchema);
