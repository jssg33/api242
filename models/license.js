const mongoose = require("mongoose");

const licenseSchema = new mongoose.Schema(
  {
    licenseid: { type: String, required: true, unique: true, trim: true },
    version: { type: String, required: true, trim: true },
    installdate: { type: String, required: true },
    enddate: { type: String, required: true },
    customerid: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("License", licenseSchema);
