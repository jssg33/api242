// models/building.js
const mongoose = require("mongoose");

const BuildingSchema = new mongoose.Schema({
  buildingid: { type: String, required: true },

  primaryLatitude: { type: Number, required: true },
  primaryLongitude: { type: Number, required: true },

  geofenceid: { type: String, unique: true, required: true },

  geolat1: { type: Number, required: false },
  geolong1: { type: Number, required: false },

  geolat2: { type: Number, required: false },
  geolong2: { type: Number, required: false },

  geolat3: { type: Number, required: false },
  geolong3: { type: Number, required: false },

  geolat4: { type: Number, required: false },
  geolong4: { type: Number, required: false },

  geolat5: { type: Number, required: false },
  geolong5: { type: Number, required: false },

  campusname: { type: String, required: true, default: 'University of South Carolina - Main Campus' },
  campusid: { type: String, required: true, default: "USC0001" },

  address1: { type: String, required: false },
  address2: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  zip: { type: String, required: false }
  // ⭐ NEW: Main building photo stored as binary blob
  buildingPhoto: { type: Buffer, required: false },

  // ⭐ NEW: Additional picture URLs
  pic1: { type: String, required: false },
  pic2: { type: String, required: false },
  pic3: { type: String, required: false },
  pic4: { type: String, required: false },
  pic5: { type: String, required: false },
});

module.exports = mongoose.model("Building", BuildingSchema);
