// Audit/models/apiapplicationapi.model.js — port of analyticsgen4rev2/Audit/apiapplicationapi.model.cs
// (Enterprise.Models.ApplicationApi): link row between an Application and the Apihost (optionally Database) it
// runs on. applicationId/apiHostId/databaseId are real ObjectId refs (not the C# int FKs) — this entity exists
// purely to join other Mongo collections, so a literal Number port would never match anything.
const mongoose = require("mongoose");

const applicationApiSchema = new mongoose.Schema(
  {
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Application", required: true },
    databaseId: { type: mongoose.Schema.Types.ObjectId, ref: "Database" },
    apiHostId: { type: mongoose.Schema.Types.ObjectId, ref: "Apihost", required: true },
    createdDate: { type: Date, default: Date.now }
  },
  { collection: "ApplicationApis" }
);

module.exports = mongoose.models.ApplicationApi || mongoose.model("ApplicationApi", applicationApiSchema);
