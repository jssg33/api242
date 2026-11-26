// Audit/models/apiauditrunhistory.model.js
// Port of analyticsgen4rev2/Audit/apiauditrunhistory.model.cs (Enterprise.Models.ApiauditRunHistory). One row
// per endpoint per audit run, written as a secondary insert alongside Apiaudit's own save (never updated).
const mongoose = require("mongoose");

const apiauditRunHistorySchema = new mongoose.Schema(
  {
    apiauditId: { type: Number, required: true },
    auditResultId: { type: Number },
    apiRoot: { type: String, trim: true },
    hostName: { type: String, trim: true },
    url: { type: String, trim: true },
    endpointType: { type: String, trim: true },
    statusCode: { type: Number },
    responseMs: { type: Number },
    isError: { type: Boolean, default: false },
    auditDate: { type: Date, required: true },
    recordedDate: { type: Date, default: Date.now }
  },
  { collection: "ApiauditRunHistory" }
);

module.exports = mongoose.models.ApiauditRunHistory || mongoose.model("ApiauditRunHistory", apiauditRunHistorySchema);
