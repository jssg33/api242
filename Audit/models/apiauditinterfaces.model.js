// Audit/models/apiauditinterfaces.model.js — port of analyticsgen4rev2/Audit/apiauditinterfaces.model.cs
// (Enterprise.Models.ApiInterfacesAudit). Written by Audit/controllers/InterfaceAudit.js's auditInterfaces().
const mongoose = require("mongoose");

const apiInterfacesAuditSchema = new mongoose.Schema(
  {
    apiAuditId: { type: Number },
    apiHostId: { type: Number },
    controllerName: { type: String, trim: true },
    endpointName: { type: String, trim: true },
    route: { type: String, trim: true },
    httpMethod: { type: String, trim: true },
    interfaceName: { type: String, trim: true },
    implementationName: { type: String, trim: true },
    isImplemented: { type: Boolean },
    isRegistered: { type: Boolean, default: false },
    serviceLifetime: { type: String, trim: true },
    methodName: { type: String, trim: true },
    discoveredDate: { type: Date, default: Date.now }
  },
  { collection: "ApiInterfacesAudit" }
);

module.exports = mongoose.models.ApiInterfacesAudit || mongoose.model("ApiInterfacesAudit", apiInterfacesAuditSchema);
