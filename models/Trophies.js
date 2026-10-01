const mongoose = require("mongoose");

const TrophyItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    competition: { type: String, default: "" },
    year: { type: String, default: "" },
    placement: { type: String, default: "" },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" }
  },
  { _id: false }
);

const TrophiesSchema = new mongoose.Schema(
  {
    installationId: { type: String, required: true, unique: true, index: true },
    name: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    position: { type: String, default: "" },
    address1: { type: String, default: "" },
    address2: { type: String, default: "" },
    description: { type: String, default: "" },
    trophies: { type: [TrophyItemSchema], default: [] },
    updatedBy: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trophies", TrophiesSchema);
