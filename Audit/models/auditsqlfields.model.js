// Audit/models/auditsqlfields.model.js — port of analyticsgen4rev2/Audit/auditsqlfields.model.cs (Enterprise.Models.AuditSqlField).
const mongoose = require("mongoose");

const auditSqlFieldSchema = new mongoose.Schema(
  {
    sqlTableId: { type: Number, required: true },
    columnName: { type: String, required: true, trim: true },
    dataType: { type: String, required: true, trim: true },
    maxLength: { type: Number },
    isPrimaryKey: { type: Boolean, default: false },
    isForeignKey: { type: Boolean, default: false },
    isNullable: { type: Boolean, default: false },
    containsPII: { type: Boolean, default: false },
    containsPHI: { type: Boolean, default: false },
    isEncrypted: { type: Boolean, default: false },
    description: { type: String },
    sensitivityLabel: { type: String, trim: true },
    maskingRule: { type: String, trim: true },
    userList: { type: String },
    userDenyList: { type: String }
  },
  { collection: "AuditSqlFields" }
);

module.exports = mongoose.models.AuditSqlField || mongoose.model("AuditSqlField", auditSqlFieldSchema);
