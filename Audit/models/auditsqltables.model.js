// Audit/models/auditsqltables.model.js — port of analyticsgen4rev2/Audit/auditsqltables.model.cs (Enterprise.Models.AuditSqlTable).
const mongoose = require("mongoose");

const auditSqlTableSchema = new mongoose.Schema(
  {
    sqlServerId: { type: Number, required: true },
    schemaName: { type: String, required: true, trim: true },
    tableName: { type: String, required: true, trim: true },
    description: { type: String },
    containsPHI: { type: Boolean, default: false },
    containsPII: { type: Boolean, default: false },
    someRowCount: { type: Number },
    tableSizeMB: { type: Number },
    lastStatisticsUpdate: { type: Date },
    hasRowLevelSecurity: { type: Boolean, default: false },
    hasDynamicDataMasking: { type: Boolean, default: false },
    classificationStatus: { type: String, trim: true },
    userList: { type: String },
    userDenyList: { type: String }
  },
  { collection: "AuditSqlTables" }
);

module.exports = mongoose.models.AuditSqlTable || mongoose.model("AuditSqlTable", auditSqlTableSchema);
