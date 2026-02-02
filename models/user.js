const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 150
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
    },

    // Replace plainpassword with a proper password field
    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 200
    },

    // Optional contact info
    phone: {
      type: String,
      trim: true
    },

    // Optional relationship to Company
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    },

    // Optional relationship to Branch
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch"
    },

    // Role-based access control
    role: {
      type: String,
      enum: ["admin", "manager", "user"],
      default: "user"
    },

    // Account status
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

