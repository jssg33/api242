// Audit/models/DatabaseFieldSecurity.models.js — port of analyticsgen4rev2/Audit/DatabaseFieldSecurity.models.cs
// (Enterprise.Models.DatabaseFieldSecurity). No C# controller exists for this entity anywhere in the Audit
// folder — it's read only by DatabaseFieldValidationRoutines.cs (ported as DatabaseFieldValidationRoutines.js),
// so this is model-only, no route.
const mongoose = require("mongoose");

const databaseFieldSecuritySchema = new mongoose.Schema(
  {
    tableName: { type: String, trim: true },
    fieldName: { type: String, trim: true },
    roleName: { type: String, trim: true },
    canRead: { type: Boolean, default: true },
    canInsert: { type: Boolean },
    canUpdate: { type: Boolean },
    canDelete: { type: Boolean }
  },
  { collection: "DatabaseFieldSecurity" }
);

module.exports = mongoose.models.DatabaseFieldSecurity || mongoose.model("DatabaseFieldSecurity", databaseFieldSecuritySchema);
