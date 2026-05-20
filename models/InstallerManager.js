// models/InstallerManager.js
const mongoose = require("mongoose");

const InstallerManagerSchema = new mongoose.Schema(
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

    // Fleet assignment
    assignedtruck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Truck"
    },

    // Organizational placement
    buid: { type: mongoose.Schema.Types.ObjectId, ref: "BusinessUnit" },
    ouid: { type: mongoose.Schema.Types.ObjectId, ref: "OrganizationUnit" },

    // Direct reports (Installers)
    installerlist: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Installer" }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("InstallerManager", InstallerManagerSchema);
