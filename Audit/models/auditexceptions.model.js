// Audit/models/auditexceptions.model.js — port of analyticsgen4rev2/Audit/auditexceptions.model.cs
// (Enterprise.Models.AuditException). Paired with Audit/controllers/apiauditexceptionscontroller.js (file-base
// mismatch inherited from the C# source).
const mongoose = require("mongoose");

const auditExceptionSchema = new mongoose.Schema(
  {
    apiAuditId: { type: Number, required: true },
    reason: { type: String },
    approvedBy: { type: String, trim: true },
    approvalDate: { type: Date },
    expirationDate: { type: Date },
    active: { type: Boolean, default: true },
    notes: { type: String },
    apiRootUrl: { type: String, trim: true },
    apiEndpointPath: { type: String, trim: true },
    createdDate: { type: Date, default: Date.now }
  },
  { collection: "AuditExceptions" }
);

module.exports = mongoose.models.AuditException || mongoose.model("AuditException", auditExceptionSchema);
