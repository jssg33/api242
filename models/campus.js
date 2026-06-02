const mongoose = require("mongoose");

const CampusSchema = new mongoose.Schema({
  // Secondary key
  campusid: { type: String, required: true, unique: true },

  // Associations
  companyid: { type: String, required: false },
  university: { type: String, required: false },

  // Address
  address1: { type: String, required: false },
  address2: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  zip: { type: String, required: false },

  // Contact
  phone: { type: String, required: false },
  fax: { type: String, required: false },
  email: { type: String, required: false },

  // Administration building reference
  administrationBuildingId: { type: String, required: false },

  // NEW: Logo URL
  logourl: { type: String, required: false }
});

module.exports = mongoose.model("Campus", CampusSchema);
