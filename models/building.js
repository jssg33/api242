// models/building.js
const mongoose = require("mongoose");

const BuildingSchema = new mongoose.Schema({
  buildingid: { type: String, required: true },

  primaryLatitude: { type: Number, required: true },
  primaryLongitude: { type: Number, required: true },

  geofenceid: { type: String, unique: true },

  geolat1: { type: Number, required: true },
  geolong1: { type: Number, required: true },

  geolat2: { type: Number, required: true },
  geolong2: { type: Number, required: true },

  geolat3: { type: Number, required: true },
  geolong3: { type: Number, required: true },

  geolat4: { type: Number, required: true },
  geolong4: { type: Number, required: true },

  geolat5: { type: Number, required: true },
  geolong5: { type: Number, required: true },

  campusname: { type: String, required: true },
  campusid: { type: String, required: true },

  address1: { type: String, required: true },
  address2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true }
});

// Auto-generate geofenceid using ObjectId
BuildingSchema.pre("save", function (next) {
  if (this.isNew) {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const yy = String(now.getFullYear()).slice(-2);

    this.geofenceid = `${this.state}${mm}${dd}${yy}_${this._id}`;
  }
  next();
});

module.exports = mongoose.model("Building", BuildingSchema);
