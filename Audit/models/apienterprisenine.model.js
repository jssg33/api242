// Audit/models/apienterprisenine.model.js — port of analyticsgen4rev2/Audit/apienterprisenine.model.cs (Enterprise.Models.Enterprise9).
const mongoose = require("mongoose");

const enterprise9Schema = new mongoose.Schema(
  {
    apiHostId: { type: Number, required: true },
    apiHostName: { type: String, required: true, trim: true },
    logName: { type: String, required: true, trim: true },
    logDescription: { type: String, trim: true },
    endpointUrl: { type: String, trim: true },
    httpMethod: { type: String, trim: true },
    isRequired: { type: Boolean, default: true },
    isImplemented: { type: Boolean, default: false },
    lastValidated: { type: Date },
    notes: { type: String },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date },
    isActive: { type: Boolean, default: true },
    apiServiceId: { type: Number },
    apiServiceName: { type: String, trim: true }
  },
  { collection: "Enterprise9" }
);

module.exports = mongoose.models.Enterprise9 || mongoose.model("Enterprise9", enterprise9Schema);
