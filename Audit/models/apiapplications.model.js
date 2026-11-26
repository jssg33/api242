// Audit/models/apiapplications.model.js — port of analyticsgen4rev2/Audit/apiapplications.model.cs
// (Enterprise.Models.Application). No C# controller shares this exact base name; see apiapplication.controller.js.
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    applicationName: { type: String, required: true, trim: true },
    applicationCode: { type: String, trim: true },
    description: { type: String, trim: true },
    ownerName: { type: String, trim: true },
    ownerEmail: { type: String, trim: true },
    supportGroup: { type: String, trim: true },
    businessUnit: { type: String, trim: true },
    environment: { type: String, trim: true },
    inventoryId: { type: String, trim: true },
    webServerId: { type: Number },
    webFarmId: { type: Number },
    databaseId: { type: Number },
    isActive: { type: Boolean, default: true },

    uiCodebase: { type: String, trim: true },
    apiVendor: { type: String, trim: true },
    uiHtmlVendor: { type: String, trim: true },
    uiReactVendor: { type: String, trim: true },
    osUiHtml: { type: String, trim: true },
    osUiReact: { type: String, trim: true },
    osApi: { type: String, trim: true },

    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date },

    // Entra association
    directoryId: { type: Number },
    tenantId: { type: String, trim: true },
    clientId: { type: String, trim: true },
    objectId: { type: String, trim: true },
    servicePrincipalId: { type: String, trim: true },
    entraSyncEnabled: { type: Boolean, default: false },
    lastEntraSync: { type: Date }
  },
  { collection: "Applications" }
);

module.exports = mongoose.models.Application || mongoose.model("Application", applicationSchema);
