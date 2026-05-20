const mongoose = require("mongoose");

// Business Unit Schema
const businessUnitSchema = new mongoose.Schema(
  {
    buid: {
      type: String,
      required: true,
      trim: true
    },
    buname: {
      type: String,
      required: true,
      trim: true
    }
  },
  { _id: false }
);

// Organization Unit Schema
const organizationUnitSchema = new mongoose.Schema(
  {
    ouid: {
      type: String,
      required: true,
      trim: true
    },
    ouname: {
      type: String,
      required: true,
      trim: true
    },

    // Nested Business Units
    businessunits: [businessUnitSchema]
  },
  { _id: false }
);

// Company Schema
const companySchema = new mongoose.Schema(
  {
    companyId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    address1: {
      type: String,
      required: true,
      trim: true
    },
    address2: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    zip: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    fax: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
    },

    // ⭐ NEW: Multiple OUs, each with nested BUs
    organizationunits: [organizationUnitSchema],

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);

