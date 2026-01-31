const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  name: { type: String, required: true },
  location: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Branch", branchSchema);
