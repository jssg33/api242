// Audit/models/site.model.js — port of analyticsgen4rev2/Audit/site.controller.cs's Site entity. There is no
// separate site.model.cs in that folder; fields are inferred from the Site properties the controller itself reads/writes.
const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
  {
    siteName: { type: String, trim: true },
    siteCode: { type: String, trim: true },
    address1: { type: String, trim: true },
    address2: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    siteManager: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    notes: { type: String }
  },
  { collection: "Sites" }
);

module.exports = mongoose.models.Site || mongoose.model("Site", siteSchema);
