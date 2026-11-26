// Audit/models/auditapplication.replica.model.js — port of analyticsgen4rev2/Audit/auditapplication.replica.model.cs
// (Enterprise.Models.AuditApplicationReplica). Paired with Audit/controllers/auditapplication.replicas.controller.js
// (singular vs plural base name, same mismatch as in the C#). auditApplicationId/VersionId reference entities
// out of scope for this port (see auditapplicationversion.model.js), so they stay plain Number FKs.
const mongoose = require("mongoose");

const auditApplicationReplicaSchema = new mongoose.Schema(
  {
    auditApplicationId: { type: Number, required: true },
    auditApplicationVersionId: { type: Number },
    replicaName: { type: String, trim: true },
    shardId: { type: String, trim: true },
    region: { type: String, trim: true },
    environmentName: { type: String, trim: true }, // Production, QA, Dev, DR
    hostName: { type: String, trim: true },
    serverName: { type: String, trim: true },
    url: { type: String, trim: true },
    ipAddress: { type: String, trim: true },
    datacenterId: { type: Number },
    vendorId: { type: Number },
    status: { type: String, trim: true }, // Running, Stopped, Failed
    isProduction: { type: Boolean, default: false },
    lastDeploymentDate: { type: Date },
    lastHealthCheckDate: { type: Date },
    ownerUserId: { type: Number },
    notes: { type: String },
    isActive: { type: Boolean, default: true },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date }
  },
  { collection: "AuditApplicationReplicas" }
);

module.exports = mongoose.models.AuditApplicationReplica || mongoose.model("AuditApplicationReplica", auditApplicationReplicaSchema);
