// models/Installer.js
const mongoose = require("mongoose");

const InstallerSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    firstname: String,

    phone: String,
    cell: String,

    region: String,
    hiredate: Date,
    status: {
      type: String,
      enum: ["active", "suspended", "terminated", "leave"],
      default: "active"
    },

    // Assigned truck
    assignedtruck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Truck"
    },

    // Organizational placement
    buid: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessUnit" },
    ouid: { type: mongoose.Schema.Types.ObjectId, ref: "OrganizationUnit" },

    // Manager
    managerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InstallerManager"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Installer", InstallerSchema);
