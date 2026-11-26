// Audit/models/webserver.model.js
// Port of analyticsgen4rev2/Audit/webserver.model.cs (Enterprise.Models.WebServer). The schema already exists
// at the top level (models/WebServer.js, used by the system console's server poll) — re-exported here so
// there's one Mongoose model registration instead of two competing schemas for "WebServers".
module.exports = require("../../models/WebServer");
