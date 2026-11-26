// Audit/models/auditapplicationversion.model.js — port of analyticsgen4rev2/Audit/auditapplicationversion.model.cs
// (Enterprise.Models.AuditApplicationVersion). auditApplicationId references an AuditApplication entity that
// lives outside this Audit folder (out of scope for this port), so it stays a plain Number FK.
const mongoose = require("mongoose");

const auditApplicationVersionSchema = new mongoose.Schema(
  {
    auditApplicationId: { type: Number, required: true },
    versionNumber: { type: String, trim: true },
    buildNumber: { type: String, trim: true },
    releaseName: { type: String, trim: true },
    releaseType: { type: String, trim: true }, // Production, QA, Dev, Beta
    sourceControlTag: { type: String, trim: true },
    sourceControlCommit: { type: String, trim: true },
    isCurrentVersion: { type: Boolean, default: false },
    isSupported: { type: Boolean, default: true },
    releaseDate: { type: Date },
    endOfLifeDate: { type: Date },
    releaseNotes: { type: String },
    approvedBy: { type: String, trim: true },
    requestTicket: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date }
  },
  { collection: "AuditApplicationVersions" }
);

module.exports = mongoose.models.AuditApplicationVersion || mongoose.model("AuditApplicationVersion", auditApplicationVersionSchema);
