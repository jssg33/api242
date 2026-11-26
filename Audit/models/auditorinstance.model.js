// Audit/models/auditorinstance.model.js — port of analyticsgen4rev2/Audit/auditorinstance.model.cs
// (Enterprise.Models.AuditorInstance).
const mongoose = require("mongoose");

const auditorInstanceSchema = new mongoose.Schema(
  {
    siteId: { type: String, required: true, trim: true },
    region: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    account: { type: String, trim: true },
    subAccount: { type: String, trim: true },
    customer: { type: String, trim: true },
    techContactId: { type: Number },
    status: { type: String, trim: true },
    version: { type: String, trim: true },
    apiHostId: { type: Number },
    publicUrl: { type: String, trim: true },
    lastHeartbeat: { type: Date }
  },
  { collection: "AuditorInstances" }
);

module.exports = mongoose.models.AuditorInstance || mongoose.model("AuditorInstance", auditorInstanceSchema);
