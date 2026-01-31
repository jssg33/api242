const mongoose = require("mongoose");

const instanceSchema = new mongoose.Schema({
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
  instanceType: { type: String, required: true },
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Instance", instanceSchema);
