const mongoose = require("mongoose");

// One document per personal/portfolio page (about, vitae, awards,
// certifications, publications, portfolio, picturewall, trophies,
// matransactions, greenville, capitoltechnology, usc, upenn, umich, udel,
// uncw, utexas, odu, wm, usclife, interests, ...). `data` holds whatever
// shape that page's component already uses locally, so no per-page schema
// is needed — this replaces the /public/data/<page>.json files and the
// localStorage-only edits currently used by those page components.
const PersonalPageContentSchema = new mongoose.Schema(
  {
    pageKey: { type: String, required: true, unique: true, index: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
    updatedBy: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("PersonalPageContent", PersonalPageContentSchema);
