const mongoose = require("mongoose");

const downloadLogSchema = new mongoose.Schema(
  {
    downloadsource: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    userid: { type: String, required: true, trim: true },
    useremail: { type: String, required: true, trim: true, lowercase: true },
    referralsource: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DownloadLog", downloadLogSchema);
