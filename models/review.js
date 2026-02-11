const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    // Unified author field (used for CGPARKS + product reviews)
    uid: {
      type: String,
      required: true
    },

    // Optional: product review linkage
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },

    // Optional: park review linkage
    parkId: {
      type: Number
    },

    // Rating 1–5
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    // Optional title (product reviews)
    title: {
      type: String,
      trim: true
    },

    // Review text
    review: {
      type: String,
      required: true,
      trim: true
    },

    // Optional: product purchase verification
    verifiedPurchase: {
      type: Boolean,
      default: false
    },

    // CGPARKS fields
    dateWritten: {
      type: String
    },

    dateVisited: {
      type: String
    },
    userId: {
      type: String
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
