// models/BusinessUnit.js
const mongoose = require("mongoose");

const BusinessUnitSchema = new mongoose.Schema(
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
    },

    // Parent OU reference
    orgunitid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrganizationUnit",
      required: true
    },

    // Parent Company reference
    companyid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("BusinessUnit", BusinessUnitSchema);
