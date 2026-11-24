// models/WebServer.js
// Same fields as the C# Enterprise.Models.WebServer (G4 / G2). Read by the system console server poll (option 9).
const mongoose = require("mongoose");

const webServerSchema = new mongoose.Schema(
  {
    inventoryId: { type: String, trim: true },
    serverName: { type: String, trim: true },
    hostname: { type: String, trim: true },
    ipAddress: { type: String, trim: true },
    operatingSystem: { type: String, trim: true },
    webServerType: { type: String, trim: true },
    version: { type: String, trim: true },
    azureURL: { type: String, trim: true },
    applicationURL: { type: String, trim: true },
    azureIP: { type: String, trim: true },
    cName1: { type: String, trim: true },
    cName2: { type: String, trim: true },
    cName3: { type: String, trim: true },
    environment: { type: String, trim: true },
    location: { type: String, trim: true },
    azureSubscription: { type: String, trim: true },
    resourceGroup: { type: String, trim: true },
    region: { type: String, trim: true },
    owner: { type: String, trim: true },
    supportTeam: { type: String, trim: true },
    tlsVersion: { type: String, trim: true },
    publicFacing: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    notes: { type: String },
    isProxy: { type: Boolean },
    isProxySlave: { type: Boolean },
    createdDate: { type: Date, default: Date.now }
  },
  { collection: "WebServers" }
);

module.exports = mongoose.models.WebServer || mongoose.model("WebServer", webServerSchema);
