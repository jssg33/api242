// Audit/models/auditcatalogue.model.js — port of analyticsgen4rev2/Audit/auditcatalogue.model.cs (Enterprise.Models.AuditCatalogue).
const mongoose = require("mongoose");

const auditCatalogueSchema = new mongoose.Schema(
  {
    auditCode: { type: String, required: true, trim: true },
    auditName: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: { type: String, trim: true },
    subCategory: { type: String, trim: true },
    severity: { type: String, trim: true },
    auditType: { type: String, trim: true },
    recommendedAction: { type: String },
    complianceFramework: { type: String, trim: true },
    isAutomated: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date },
    notes: { type: String }
  },
  { collection: "AuditCatalogues" }
);

module.exports = mongoose.models.AuditCatalogue || mongoose.model("AuditCatalogue", auditCatalogueSchema);
