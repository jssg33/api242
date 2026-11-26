// Audit/models/databasefields.model.js
// Port of analyticsgen4rev2/Audit/databasefields.model.cs (Enterprise.Models.DatabaseField). The schema already
// exists at the top level (filled by services/SqlAzureFieldAudit.js, the system console's field audit) — this
// re-exports it so there's one Mongoose model registration instead of two competing schemas for "DatabaseFields".
module.exports = require("../../models/DatabaseField");
