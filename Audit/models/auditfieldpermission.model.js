// Audit/models/auditfieldpermission.model.js — port of analyticsgen4rev2/Audit/auditfieldpermission.model.cs
// (Enterprise.Models.AuditFieldPermission).
const mongoose = require("mongoose");

const auditFieldPermissionSchema = new mongoose.Schema(
  {
    principalId: { type: Number, required: true },
    sqlFieldId: { type: Number, required: true },
    canRead: { type: Boolean, default: false },
    canUpdate: { type: Boolean, default: false },
    canMask: { type: Boolean, default: false },
    canDecrypt: { type: Boolean, default: false }
  },
  { collection: "AuditFieldPermissions" }
);

module.exports = mongoose.models.AuditFieldPermission || mongoose.model("AuditFieldPermission", auditFieldPermissionSchema);
