// Audit/models/trafficrouter.model.js — port of analyticsgen4rev2/Audit/trafficrouter.model.cs (Enterprise.Models.TrafficRouter).
const mongoose = require("mongoose");

const trafficRouterSchema = new mongoose.Schema(
  {
    routerName: { type: String, trim: true },
    routerType: { type: String, trim: true }, // FrontDoor, TrafficManager, LoadBalancer, ApplicationGateway, ApiManagement
    routingMethod: { type: String, trim: true }, // Priority, Performance, Weighted, Geographic, RoundRobin
    subscriptionId: { type: String, trim: true },
    resourceGroupName: { type: String, trim: true },
    azureResourceId: { type: String, trim: true },
    isEnabled: { type: Boolean, default: true },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date },
    parentTrafficRouterId: { type: Number }
  },
  { collection: "TrafficRouters" }
);

module.exports = mongoose.models.TrafficRouter || mongoose.model("TrafficRouter", trafficRouterSchema);
