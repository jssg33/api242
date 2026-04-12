const mongoose = require("mongoose");

const productReviewSchema = new mongoose.Schema(
  {
    // Unified author field (used for CGPARKS + product reviews) MongoDB ID
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      required: false
    },
    
    // Unified author field (used for CGPARKS + product reviews)
    uidGUID: {
      type: String,
      required: false
    },

    // Optional: product review linkage for MongoDB ID
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false
    },
    // Optional: product review linkage for Parks GUIDS or Other Product String
    productGUID: {
      type: String,
      ref: "ProductGUID",
      required: false
    },

    // Optional: park review linkage MongoDB ID
    parkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkMongo",
      required: false
    },
    // Optional: park review linkage ParkGUID or Other Product String
    parkGUID: {
      type: String,
      ref: "ParkGUID",
      required: false
    },
    // Optional: park review linkage Legacy Parks
    parkLEGACY: {
      type: String,
      ref: "ParkLegacyCSharp",
      required: false
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




module.exports = mongoose.model("ProductReview", productReviewSchema);
