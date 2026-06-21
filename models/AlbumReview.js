const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const AlbumReviewSchema = new mongoose.Schema({
  reviewGuid: {
    type: String,
    required: true,
    unique: true,
    default: () => randomUUID()
  },

  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
    required: true,
    index: true
  },

  userId: {
    type: String,
    required: true,
    index: true
  },

  rating: {
    type: Number,
    required: false,
    min: 1,
    max: 5
  },

  reviewText: {
    type: String,
    required: false,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("AlbumReview", AlbumReviewSchema);
