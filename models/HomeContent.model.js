const mongoose = require("mongoose");

const TileOverrideSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String }
  },
  { _id: false }
);

const QuickLinkSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    path: { type: String, required: true },
    requiresLogin: { type: Boolean, default: false }
  },
  { _id: false }
);

const HomeContentSchema = new mongoose.Schema(
  {
    installationId: { type: String, required: true, unique: true, index: true },
    heroImageUrl: { type: String, default: "" },
    myLinksOverrides: {
      type: Map,
      of: TileOverrideSchema,
      default: {}
    },
    corporateLinksOverrides: {
      type: Map,
      of: TileOverrideSchema,
      default: {}
    },
    quickLinks: { type: [QuickLinkSchema], default: [] },
    updatedBy: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomeContent", HomeContentSchema);
