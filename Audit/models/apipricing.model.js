// Audit/models/apipricing.model.js — port of analyticsgen4rev2/Audit/apipricing.model.cs (Enterprise.Models.ApiPricing).
const mongoose = require("mongoose");

const apiPricingSchema = new mongoose.Schema(
  {
    apiGroup: { type: String, trim: true },
    description: { type: String, trim: true },
    pricePerUse: { type: Number, default: 0.05 },
    active: { type: Boolean, default: true },
    createdDate: { type: Date },
    modifiedDate: { type: Date }
  },
  { collection: "ApiPricing" }
);

module.exports = mongoose.models.ApiPricing || mongoose.model("ApiPricing", apiPricingSchema);
