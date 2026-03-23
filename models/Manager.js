const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema(
  {
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
      }
    ],

    supervisorid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manager",
      default: null
    },

    isceo: {
      type: Number,
      enum: [0, 1],
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Manager", managerSchema);
