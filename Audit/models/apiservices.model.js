// Audit/models/apiservices.model.js — port of analyticsgen4rev2/Audit/apiservices.model.cs (Enterprise.Models.ApiService).
const mongoose = require("mongoose");

const apiServiceSchema = new mongoose.Schema(
  {
    serviceName: { type: String, required: true, trim: true },
    interfaceId: { type: Number },
    interfaceName: { type: String, trim: true },
    implementationClass: { type: String, trim: true },
    description: { type: String, trim: true },
    serviceType: { type: String, trim: true },
    serviceOwner: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date },
    apiHostId: { type: Number },
    apiHostName: { type: String, trim: true }
  },
  { collection: "ApiServices" }
);

module.exports = mongoose.models.ApiService || mongoose.model("ApiService", apiServiceSchema);
