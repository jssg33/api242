const mongoose = require("mongoose");

const userContactsSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    address1: { type: String, required: true, trim: true },
    address2: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    zip: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    fax: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserContact", userContactsSchema);
