// Audit/models/apihostexception.model.js — port of analyticsgen4rev2/Audit/apihostexception.model.cs
// (Enterprise.Models.ApiHostException).
const mongoose = require("mongoose");

const apiHostExceptionSchema = new mongoose.Schema(
  {
    apiHostId: { type: Number, required: true },
    exceptionType: { type: String, trim: true },
    reason: { type: String },
    approvedBy: { type: String, trim: true },
    approvalDate: { type: Date },
    expirationDate: { type: Date },
    active: { type: Boolean, default: true },
    notes: { type: String },
    createdDate: { type: Date, default: Date.now }
  },
  { collection: "ApiHostExceptions" }
);

module.exports = mongoose.models.ApiHostException || mongoose.model("ApiHostException", apiHostExceptionSchema);
