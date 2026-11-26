// Audit/models/databases.model.js — port of analyticsgen4rev2/Audit/databases.model.cs (Enterprise.Models.Database).
const mongoose = require("mongoose");

const databaseSchema = new mongoose.Schema(
  {
    inventoryId: { type: String, trim: true },
    databaseServerId: { type: Number, required: true },
    databaseName: { type: String, trim: true },
    description: { type: String, trim: true },
    databaseType: { type: String, trim: true },
    version: { type: String, trim: true },
    classification: { type: String, trim: true },
    owner: { type: String, trim: true },
    supportTeam: { type: String, trim: true },
    backupRequired: { type: Boolean, default: false },
    encryptionEnabled: { type: Boolean, default: false },
    containsPII: { type: Boolean, default: false },
    containsPHI: { type: Boolean, default: false },
    containsPCI: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    notes: { type: String },
    createdDate: { type: Date, default: Date.now },
    userList: { type: String },
    userDenyList: { type: String },
    backupServiceId: { type: Number }
  },
  { collection: "Databases" }
);

module.exports = mongoose.models.Database || mongoose.model("Database", databaseSchema);
