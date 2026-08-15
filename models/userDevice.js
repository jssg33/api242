const mongoose = require("mongoose");

const userDeviceSchema = new mongoose.Schema(
  {
    // Link to User
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Device Identity
    deviceserialnumber: { type: String, trim: true },
    deviceIMEI1: { type: String, trim: true },
    deviceIMEI2: { type: String, trim: true },
    devicemodel: { type: String, trim: true },
    devicetype: { type: String, trim: true },        // phone, tablet, laptop, etc.
    deviceosversion: { type: String, trim: true },
    devicecarrier: { type: String, trim: true },
    deviceCLLP: { type: String, trim: true },

    // Ownership
    ownedByUser: { type: Boolean, default: true },   // user-owned vs corporate-owned
    corporateAssetTag: { type: String, trim: true }, // optional for corporate devices

    // Status
    active: { type: Boolean, default: true },        // device currently in use?
    nickname: { type: String, trim: true },          // "Work Phone", "Personal iPhone"

    // Metadata
    lastSeenLocationId: { type: mongoose.Schema.Types.ObjectId, ref: "userLocationHistory" },
    lastSeenTimestamp: { type: Date },

    // Optional: device capabilities
    supportsGPS: { type: Boolean, default: true },
    supportsCellular: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserDevice", userDeviceSchema);
