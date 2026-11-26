// Audit/models/auditsqlserver.model.js — port of analyticsgen4rev2/Audit/auditsqlserver.model.cs (Enterprise.Models.AuditSqlServer).
const mongoose = require("mongoose");

const auditSqlServerSchema = new mongoose.Schema(
  {
    serverName: { type: String, required: true, trim: true, maxlength: 200 },
    databaseName: { type: String, required: true, trim: true, maxlength: 200 },
    databaseType: { type: String, required: true, trim: true, maxlength: 50 },
    databaseVersion: { type: String, trim: true, maxlength: 100 },
    environment: { type: String, trim: true, maxlength: 50 },
    ownerName: { type: String, trim: true, maxlength: 200 },
    ownerEmail: { type: String, trim: true, maxlength: 200 },
    ownerPhone: { type: String, trim: true, maxlength: 50 },
    dbaName: { type: String, trim: true, maxlength: 200 },
    dbaEmail: { type: String, trim: true, maxlength: 200 },
    dbaPhone: { type: String, trim: true, maxlength: 50 },
    dbContextName: { type: String, trim: true, maxlength: 200 },
    connectionStringName: { type: String, trim: true, maxlength: 200 },
    description: { type: String },
    createdDate: { type: Date, default: Date.now },
    active: { type: Boolean, default: false },
    databaseSizeMB: { type: Number },
    backupPolicy: { type: String },
    geoReplicationEnabled: { type: Boolean, default: false },
    tdeEnabled: { type: Boolean, default: false },
    defenderEnabled: { type: Boolean, default: false },
    userList: { type: String },
    userDenyList: { type: String }
  },
  { collection: "AuditSqlServers" }
);

module.exports = mongoose.models.AuditSqlServer || mongoose.model("AuditSqlServer", auditSqlServerSchema);
