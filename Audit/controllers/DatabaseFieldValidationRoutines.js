// Audit/controllers/DatabaseFieldValidationRoutines.js
// Port of analyticsgen4rev2/Audit/DatabaseFieldValidationRoutines.cs (Enterprise.Security.ValidationRoutines).
// Four pure read checks over DatabaseFieldSecurity. Not a C# controller (no Map*Endpoints there either), so
// this has no matching route file — it's a plain helper module other controllers can require.
const DatabaseFieldSecurity = require("../models/DatabaseFieldSecurity.models");

async function canReadField(roleName, tableName, fieldName) {
  return DatabaseFieldSecurity.exists({ roleName, tableName, fieldName, canRead: true }).then(Boolean);
}

async function canInsertField(roleName, tableName, fieldName) {
  return DatabaseFieldSecurity.exists({ roleName, tableName, fieldName, canInsert: true }).then(Boolean);
}

async function canUpdateField(roleName, tableName, fieldName) {
  return DatabaseFieldSecurity.exists({ roleName, tableName, fieldName, canUpdate: true }).then(Boolean);
}

async function canDeleteField(roleName, tableName, fieldName) {
  return DatabaseFieldSecurity.exists({ roleName, tableName, fieldName, canDelete: true }).then(Boolean);
}

module.exports = { canReadField, canInsertField, canUpdateField, canDeleteField };
