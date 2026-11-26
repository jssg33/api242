// Audit/models/apiapplicationuser.model.js — port of analyticsgen4rev2/Audit/apiapplicationuser.model.cs
// (Enterprise.Models.ApplicationUser). applicationId/userId are real ObjectId refs (not the C# int FKs),
// userId referencing the existing top-level User model, since this entity exists purely to join two
// collections — a literal Number port would never match anything.
const mongoose = require("mongoose");

const applicationUserSchema = new mongoose.Schema(
  {
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Application", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    permission: { type: String, trim: true },
    roleName: { type: String, trim: true },
    accessType: { type: String, trim: true }, // User, Service Account, Shared Account
    approvalGroup: { type: String, trim: true },
    isActive: { type: Boolean, default: true },

    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date },
    lastReviewedDate: { type: Date },
    reviewedBy: { type: String, trim: true },
    requestTicket: { type: String, trim: true },
    businessJustification: { type: String },
    accessGrantedDate: { type: Date },
    accessRemovedDate: { type: Date }
  },
  { collection: "ApplicationUsers" }
);

module.exports = mongoose.models.ApplicationUser || mongoose.model("ApplicationUser", applicationUserSchema);
