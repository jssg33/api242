// models/UserGroup.js
// Migrated from Sequelize to Mongoose (the Sequelize factory was never
// initialised, so every /usergroups endpoint returned 500).
// userId / groupId stay numeric to match the legacy integer keys.
const mongoose = require("mongoose");

const UserGroupSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true, index: true },
    groupId: { type: Number, required: true, index: true },
    role: { type: String, default: "member", trim: true },
    status: { type: String, default: "active", trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserGroup", UserGroupSchema);
