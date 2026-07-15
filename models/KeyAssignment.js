// models/KeyAssignment.js

const mongoose = require("mongoose");

const keyAssignmentSchema = new mongoose.Schema(
  {
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "UserSession", required: true },
    keyId: { type: String, required: true },          // PKI-Lite key ID
    alias: { type: String },
    publicKey: { type: String, required: true },
    deliveredToUser: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("KeyAssignment", keyAssignmentSchema);
