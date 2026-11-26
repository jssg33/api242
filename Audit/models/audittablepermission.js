// Audit/models/audittablepermission.js — port of analyticsgen4rev2/Audit/audittablepermission.cs
// (Enterprise.Models.AuditTablePermission). The C# file has no ".model" suffix in its own name, so neither
// does this one, consistent with the "same file name base" rule.
const mongoose = require("mongoose");

const auditTablePermissionSchema = new mongoose.Schema(
  {
    principalId: { type: Number, required: true },
    sqlTableId: { type: Number, required: true },
    canSelect: { type: Boolean, default: false },
    canInsert: { type: Boolean, default: false },
    canUpdate: { type: Boolean, default: false },
    canDelete: { type: Boolean, default: false }
  },
  { collection: "AuditTablePermissions" }
);

module.exports = mongoose.models.AuditTablePermission || mongoose.model("AuditTablePermission", auditTablePermissionSchema);
