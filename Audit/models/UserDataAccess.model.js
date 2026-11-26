// Audit/models/UserDataAccess.model.js — port of the UserDataAccess entity referenced by
// analyticsgen4rev2/Audit/UserDataAccess.controller.cs. No separate model file exists in that folder, so fields
// are inferred from the controller's own field-by-field usage (Create21's checks, Update21's `Has(...)` list).
const mongoose = require("mongoose");

const userDataAccessSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true },
    databaseName: { type: String, trim: true },
    tableName: { type: String, trim: true },
    fieldName: { type: String, trim: true },
    canRead: { type: Boolean, default: false },
    canWrite: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    grantedBy: { type: String, trim: true }
  },
  { collection: "UserDataAccesses" }
);

module.exports = mongoose.models.UserDataAccess || mongoose.model("UserDataAccess", userDataAccessSchema);
