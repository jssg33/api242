const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const SongReviewSchema = new mongoose.Schema({
  reviewGuid: {
    type: String,
    required: true,
    unique: true,
    default: () => randomUUID()
  },

  songId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
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

module.exports = mongoose.model("SongReview", SongReviewSchema);
