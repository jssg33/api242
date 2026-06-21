const AlbumReview = require("../models/AlbumReview");

exports.createAlbumReview = async (req, res) => {
  try {
    const review = new AlbumReview(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: "Error creating album review", error: err.message });
  }
};

exports.getReviewsByAlbum = async (req, res) => {
  try {
    const reviews = await AlbumReview.find({ albumId: req.params.albumId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching album reviews", error: err.message });
  }
};
