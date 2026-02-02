const mongoose = require("mongoose");

const licenseLogSchema = new mongoose.Schema(
  {
    licenseid: { type: String, required: true, trim: true },
    accessdate: { type: String, required: true },
    userid: { type: String, required: true, trim: true },
    shard: { type: String, required: true },
    instanceid: { type: String, required: true },
    licensestatus: {
      type: String,
      required: true,
      enum: ["active", "inactive", "expired", "revoked"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LicenseLog", licenseLogSchema);
