const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    // Reference to the product being reviewed
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    // Reference to the user who wrote the review
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Rating 1–5
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    // Optional title for the review
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

    // Optional: mark if the user actually purchased the product
    verifiedPurchase: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
