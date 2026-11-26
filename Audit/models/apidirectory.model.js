// Audit/models/apidirectory.model.js — port of analyticsgen4rev2/Audit/apidirectory.model.cs (Enterprise.Models.ApiDirectory).
const mongoose = require("mongoose");

const apiDirectorySchema = new mongoose.Schema(
  {
    tenantId: { type: String, required: true, trim: true }, // Guid in C#
    tenantName: { type: String, trim: true },
    domainName: { type: String, trim: true },
    graphClientId: { type: String, trim: true },
    graphClientSecret: { type: String, trim: true },
    isDefault: { type: Boolean, default: false },
    createdDate: { type: Date },
    modifiedDate: { type: Date },
    isDeleted: { type: Boolean, default: false },

    clientId: { type: String, trim: true },
    clientSecret: { type: String, trim: true },
    dateCreated: { type: Date },
    dateUpdated: { type: Date }
  },
  { collection: "ApiDirectory" }
);

module.exports = mongoose.models.ApiDirectory || mongoose.model("ApiDirectory", apiDirectorySchema);
