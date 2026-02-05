const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    url: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assignment", AssignmentSchema);
