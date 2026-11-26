// Audit/models/auditresults.model.js — port of analyticsgen4rev2/Audit/auditresults.model.cs (Enterprise.Models.AuditResult).
const mongoose = require("mongoose");

const auditResultSchema = new mongoose.Schema(
  {
    auditDate: { type: Date, default: Date.now },
    totalApiHosts: { type: Number, default: 0 },
    apiHostsSecure: { type: Number, default: 0 },
    apiHostsInsecure: { type: Number, default: 0 },
    totalApiEndpoints: { type: Number, default: 0 },
    totalEndpointsSecure: { type: Number, default: 0 },
    totalEndpointsInsecure: { type: Number, default: 0 },
    auditorId: { type: Number },
    auditorName: { type: String, trim: true },
    sourceNetwork: { type: String, trim: true },
    sourceIp: { type: String, trim: true },
    notes: { type: String }
  },
  { collection: "AuditResults" }
);

module.exports = mongoose.models.AuditResult || mongoose.model("AuditResult", auditResultSchema);
