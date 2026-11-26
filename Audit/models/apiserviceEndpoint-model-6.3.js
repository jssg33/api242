// Audit/models/apiserviceEndpoint-model-6.3.js — port of analyticsgen4rev2/Audit/apiserviceEndpoint-model-6.3.cs
// (Enterprise.Models.ApiServiceEndpoint): many-to-many join between an ApiService and an Apiaudit endpoint.
// serviceId/apiAuditId are real ObjectId refs (not the C# int FKs) since this entity exists purely to join two
// other Mongo collections by their real _id — a literal Number port would never match anything.
const mongoose = require("mongoose");

const apiServiceEndpointSchema = new mongoose.Schema(
  {
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "ApiService", required: true },
    apiAuditId: { type: mongoose.Schema.Types.ObjectId, ref: "Apiaudit", required: true },
    apiHostId: { type: Number }, // denormalized from the service at link time
    createdDate: { type: Date, default: Date.now }
  },
  { collection: "ApiServiceEPS" }
);

module.exports = mongoose.models.ApiServiceEndpoint || mongoose.model("ApiServiceEndpoint", apiServiceEndpointSchema);
