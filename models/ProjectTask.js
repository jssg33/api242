const mongoose = require("mongoose");

const ProjectTaskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    projectId: { type: String },
    customerId: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProjectTask", ProjectTaskSchema);
