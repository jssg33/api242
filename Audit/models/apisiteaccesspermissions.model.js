// Audit/models/apisiteaccesspermissions.model.js — port of analyticsgen4rev2/Audit/apisiteaccesspermissions.model.cs
// (Enterprise.Models.SiteAccessPermission). File base name differs from its controller
// (Audit/controllers/siteaccesspermissions.controller.js), same mismatch as in the C# source.
const mongoose = require("mongoose");

const siteAccessPermissionSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true },
    siteId: { type: Number, required: true },
    accessLevel: { type: String, trim: true },
    isEnabled: { type: Boolean, default: true },
    grantedDate: { type: Date },
    grantedBy: { type: String, trim: true },
    expirationDate: { type: Date },
    reviewedDate: { type: Date },
    reviewedBy: { type: String, trim: true }
  },
  { collection: "SiteAccessPermissions" }
);

module.exports = mongoose.models.SiteAccessPermission || mongoose.model("SiteAccessPermission", siteAccessPermissionSchema);
