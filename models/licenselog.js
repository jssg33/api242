const mongoose = require("mongoose");

const licenseLogSchema = new mongoose.Schema(
  {
    licenseid: { type: String, required: true, trim: true },
    accessdate: { type: String, required: true },
    userid: { type: String, required: false, trim: true },
    managerid: { type: String, required: false, trim: true },
    groupid: { type: String, required: false, trim: true },
    mongoid: { type: String, required: false, trim: true },
    companyid: { type: String, required: false, trim: true },
    shard: { type: String, required: false },
    instanceid: { type: String, required: false },
    licensestatus: {
      type: String,
      required: true,
      enum: ["active", "inactive", "expired", "revoked"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LicenseLog", licenseLogSchema);
