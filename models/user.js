const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true, minlength: 1, maxlength: 150 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    plainpassword: { type: String, required: true, minlength: 4, maxlength: 200 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
