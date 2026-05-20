// models/Truck.js
const mongoose = require("mongoose");

const TruckSchema = new mongoose.Schema(
  {
    manufacturer: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    serialnumber: { type: String, required: true, unique: true, trim: true },

    // Assigned to Installer or InstallerManager
    assignedto: {
      refModel: { type: String }, // "Installer" or "InstallerManager"
      refId: { type: mongoose.Schema.Types.ObjectId }
    },

    // Fleet ownership (BU or OU)
    buid: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessUnit" },
    ouid: { type: mongoose.Schema.Types.ObjectId, ref: "OrganizationUnit" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Truck", TruckSchema);
