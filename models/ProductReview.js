const mongoose = require("mongoose");

const productReviewSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    title: {
      type: String,
      trim: true
    },

    review: {
      type: String,
      required: true,
      trim: true
    },

    verifiedPurchase: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductReview", productReviewSchema);
