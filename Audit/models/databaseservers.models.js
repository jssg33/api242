// Audit/models/databaseservers.models.js — port of analyticsgen4rev2/Audit/databaseservers.models.cs
// (Enterprise.Models.DatabaseServer). Kept plural ("models") to match the C# file's own base name.
const mongoose = require("mongoose");

const databaseServerSchema = new mongoose.Schema(
  {
    inventoryId: { type: String, trim: true },
    serverName: { type: String, trim: true },
    hostname: { type: String, trim: true },
    ipAddress: { type: String, trim: true },
    databasePlatform: { type: String, trim: true },
    version: { type: String, trim: true },
    databaseInstance: { type: String, trim: true },
    azureURL: { type: String, trim: true },
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
    backupSolution: { type: String, trim: true },
    recoveryModel: { type: String, trim: true },
    publicFacing: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    notes: { type: String },
    createdDate: { type: Date, default: Date.now },
    userList: { type: String },
    userDenyList: { type: String }
  },
  { collection: "DatabaseServers" }
);

module.exports = mongoose.models.DatabaseServer || mongoose.model("DatabaseServer", databaseServerSchema);
