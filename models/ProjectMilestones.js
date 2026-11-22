// models/ProjectMilestones.js
// Migrated from Sequelize to Mongoose (the Sequelize factory was never
// initialised, so every /projectmilestones endpoint returned 500).
// projectId / assignedTo stay numeric to match the legacy integer keys.
const mongoose = require("mongoose");

const ProjectMilestoneSchema = new mongoose.Schema(
  {
    projectId: { type: Number, required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    dueDate: { type: Date },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date },
    assignedTo: { type: Number, index: true }, // userId
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "delayed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProjectMilestone", ProjectMilestoneSchema);
