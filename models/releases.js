// models/SoftwareRelease.js
const mongoose = require('mongoose');

const SoftwareReleaseSchema = new mongoose.Schema(
  {
    vendor: {
      type: String,
      required: true,
      trim: true
    },

    majorCodeBase: {
      type: String,
      required: true,
      trim: true
    },

    majorCodeDescription: {
      type: String,
      required: true,
      trim: true
    },

    minorCodeVariant: {
      type: String,
      required: true,
      trim: true
    },

    minorCodeDescription: {
      type: String,
      required: true,
      trim: true
    },

    releaseDate: {
      type: Date,
      required: true
    },

    updates: {
      type: Object,
      required: true
    }
  },
  { timestamps: true }
);

// major.minor must be unique
SoftwareReleaseSchema.index(
  { majorCodeBase: 1, minorCodeVariant: 1 },
  { unique: true }
);

module.exports = mongoose.model('SoftwareRelease', SoftwareReleaseSchema);
