// Audit/models/AuditConfigEndpoints-110.model.js
// Port of the AuditConfig entity referenced by analyticsgen4rev2/Audit/AuditConfigEndpoints-110.cs. Its own
// model file ("Models-and-context-110.cs") isn't in this Audit folder, so fields come from the controller's own
// Limits table and the fields instanceconfig.js sends (Description, Region, Shard, Instance, Root1, Root2,
// IPv4, IPv6, IPv42, IPv62). maxlength mirrors the C#'s TooLong() check.
const mongoose = require("mongoose");

const auditConfigSchema = new mongoose.Schema(
  {
    description: { type: String, trim: true, maxlength: 500 },
    region: { type: String, trim: true, maxlength: 100 },
    shard: { type: String, trim: true, maxlength: 100 },
    instance: { type: String, trim: true, maxlength: 100 },
    root1: { type: String, trim: true, maxlength: 50 },
    root2: { type: String, trim: true, maxlength: 50 },
    ipv4: { type: String, trim: true, maxlength: 45 },
    ipv6: { type: String, trim: true, maxlength: 100 },
    ipv42: { type: String, trim: true, maxlength: 45 },
    ipv62: { type: String, trim: true, maxlength: 100 }
  },
  { collection: "AuditConfigs" }
);

module.exports = mongoose.models.AuditConfig || mongoose.model("AuditConfig", auditConfigSchema);
