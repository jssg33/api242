// controllers/songReviewController.js
const SongReview = require("../models/SongReview");

exports.createReview = async (req, res) => {
  try {
    const review = new SongReview(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: "Error creating review", error: err.message });
  }
};

exports.getReviewsBySong = async (req, res) => {
  try {
    const reviews = await SongReview.find({ songId: req.params.songId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews", error: err.message });
  }
};
