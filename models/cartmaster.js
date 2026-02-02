const mongoose = require("mongoose");

const cartMasterSchema = new mongoose.Schema(
  {
    // Matches "id" from the C# API (optional, since MongoDB has _id)
    id: {
      type: Number,
      default: 0
    },

    userId: {
      type: Number,
      required: true
    },

    cartsCount: {
      type: Number,
      default: 0
    },

    cartsCancelled: {
      type: Number,
      default: 0
    },

    cartsActive: {
      type: Number,
      default: 0
    },

    cartsActiveList: {
      type: String,
      default: ""
    },

    loyaltyid: {
      type: String,
      default: ""
    },

    loyaltyvendor: {
      type: String,
      default: ""
    },

    useridstring: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartMaster", cartMasterSchema);
