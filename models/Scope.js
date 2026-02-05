const mongoose = require("mongoose");

const ScopeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    projectId: { type: String },
    customerId: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scope", ScopeSchema);

