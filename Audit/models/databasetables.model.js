// Audit/models/databasetables.model.js
// Port of analyticsgen4rev2/Audit/databasetables.model.cs (Enterprise.Models.DatabaseTable). The schema already
// exists at the top level (filled by services/SqlAzureTableAudit.js, the system console's table audit) — this
// re-exports it so there's one Mongoose model registration instead of two competing schemas for "DatabaseTables".
module.exports = require("../../models/DatabaseTable");
