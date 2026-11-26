// Audit/models/webfarm.model.js — port of analyticsgen4rev2/Audit/webfarm.model.cs (Enterprise.Models.WebFarm).
const mongoose = require("mongoose");

const webFarmSchema = new mongoose.Schema(
  {
    inventoryId: { type: String, trim: true },
    farmName: { type: String, trim: true },
    description: { type: String, trim: true },
    loadBalancerName: { type: String, trim: true },
    loadBalancerType: { type: String, trim: true },
    virtualIpAddress: { type: String, trim: true },
    url: { type: String, trim: true },
    azureURL: { type: String, trim: true },
    azureIP: { type: String, trim: true },
    cName1: { type: String, trim: true },
    cName2: { type: String, trim: true },
    cName3: { type: String, trim: true },
    applicationURL: { type: String, trim: true },
    environment: { type: String, trim: true },
    location: { type: String, trim: true },
    azureSubscription: { type: String, trim: true },
    resourceGroup: { type: String, trim: true },
    region: { type: String, trim: true },
    owner: { type: String, trim: true },
    supportTeam: { type: String, trim: true },
    tlsVersion: { type: String, trim: true },
    backendPoolCount: { type: Number },
    healthProbeUrl: { type: String, trim: true },
    publicFacing: { type: Boolean, default: false },
    enabled: { type: Boolean, default: false },
    notes: { type: String },
    createdDate: { type: Date, default: Date.now }
  },
  { collection: "WebFarms" }
);

module.exports = mongoose.models.WebFarm || mongoose.model("WebFarm", webFarmSchema);
