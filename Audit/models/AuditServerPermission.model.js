// Audit/models/AuditServerPermission.model.js — port of analyticsgen4rev2/Audit/AuditServerPermission.model.cs
// (Enterprise.Models.AuditServerPermission).
const mongoose = require("mongoose");

const auditServerPermissionSchema = new mongoose.Schema(
  {
    principalId: { type: Number, required: true },
    sqlServerId: { type: Number, required: true },
    permissionLevel: { type: String, required: true, trim: true },
    grantedDate: { type: Date },
    revokedDate: { type: Date }
  },
  { collection: "AuditServerPermissions" }
);

module.exports = mongoose.models.AuditServerPermission || mongoose.model("AuditServerPermission", auditServerPermissionSchema);
