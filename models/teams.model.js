const mongoose = require("mongoose");

   const ProjectTeamMemberSchema = new mongoose.Schema(
    {
    projectId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    role: { type: String, enum: ["developer", "project-manager", "stakeholder"], required: true },
    type: { type: String, default: "" } // stakeholder sub-type: Marketing, Finance, HR, etc.
    },
    { timestamps: true }
);
  
module.exports = mongoose.model("ProjectTeamMember", ProjectTeamMemberSchema);
