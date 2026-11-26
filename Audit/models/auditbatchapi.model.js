// Audit/models/auditbatchapi.model.js — port of analyticsgen4rev2/Audit/auditbatchapi.model.cs
// (Enterprise.Models.AuditBatchApi): per-API-host rollup for one Run Audit batch.
const mongoose = require("mongoose");

const auditBatchApiSchema = new mongoose.Schema(
  {
    auditResultId: { type: Number, required: true },
    auditDate: { type: Date, required: true },

    apiHostId: { type: Number },
    apiHostName: { type: String, trim: true },

    endpointsAudited: { type: Number, default: 0 },
    passCount: { type: Number, default: 0 },
    warnCount: { type: Number, default: 0 },
    failCount: { type: Number, default: 0 },
    secureCount: { type: Number, default: 0 },
    insecureCount: { type: Number, default: 0 },

    epCount: { type: Number, default: 0 },
    epgCount: { type: Number, default: 0 },

    recordedDate: { type: Date, default: Date.now }
  },
  { collection: "AuditBatchApi" }
);

module.exports = mongoose.models.AuditBatchApi || mongoose.model("AuditBatchApi", auditBatchApiSchema);
