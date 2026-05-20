// models/OrganizationUnit.js
const mongoose = require("mongoose");

const OrganizationUnitSchema = new mongoose.Schema(
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

    // Parent Company reference
    companyid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrganizationUnit", OrganizationUnitSchema);
