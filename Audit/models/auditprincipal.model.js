// Audit/models/auditprincipal.model.js — port of analyticsgen4rev2/Audit/auditprincipal.model.cs (Enterprise.Models.AuditPrincipal).
const mongoose = require("mongoose");

const auditPrincipalSchema = new mongoose.Schema(
  {
    principalType: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true },
    displayName: { type: String, trim: true },
    email: { type: String, trim: true },
    objectId: { type: String, trim: true },
    active: { type: Boolean, default: false }
  },
  { collection: "AuditPrincipals" }
);

module.exports = mongoose.models.AuditPrincipal || mongoose.model("AuditPrincipal", auditPrincipalSchema);
