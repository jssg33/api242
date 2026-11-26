// Audit/models/webfarmserver.model.js
// Port of analyticsgen4rev2/Audit/webfarmserver.model.cs (Enterprise.Models.WebFarmServer): a webFarm-to-webServer
// link row. Identity uses Mongo's own _id (like the rest of this port) rather than the C# int Id.
const mongoose = require("mongoose");

const webFarmServerSchema = new mongoose.Schema(
  {
    webFarmId: { type: Number, required: true },
    webServerId: { type: Number, required: true }
  },
  { collection: "WebFarmServers" }
);

module.exports = mongoose.models.WebFarmServer || mongoose.model("WebFarmServer", webFarmServerSchema);
