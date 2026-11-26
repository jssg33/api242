// Audit/models/apiaccesspermissions.model.js
// Port of analyticsgen4rev2/Audit/apiaccesspermissions.model.cs (Enterprise.Models.ApiAccessPermission).
const mongoose = require("mongoose");

const apiAccessPermissionSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true },
    apiId: { type: Number, required: true },
    permissionLevel: { type: String, trim: true },
    isEnabled: { type: Boolean, default: true },
    createdDate: { type: Date, default: Date.now },
    grantedBy: { type: String, trim: true },
    grantedDate: { type: Date },
    expirationDate: { type: Date },
    reviewedDate: { type: Date },
    reviewedBy: { type: String, trim: true }
  },
  { collection: "ApiAccessPermissions" }
);

module.exports = mongoose.models.ApiAccessPermission || mongoose.model("ApiAccessPermission", apiAccessPermissionSchema);
