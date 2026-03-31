const ProductReview = require("../models/ProductReview");

// GET all product reviews
exports.getAllProductReviews = async (req, res) => {
  try {
    const reviews = await ProductReview.find();
    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching product reviews:", err);
    res.status(500).json({ error: "Failed to fetch product reviews" });
  }
};

// GET a single review by ID
exports.getProductReviewById = async (req, res) => {
  try {
    const review = await ProductReview.findById(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });

    res.status(200).json(review);
  } catch (err) {
    console.error("Error fetching review:", err);
    res.status(500).json({ error: "Failed to fetch review" });
  }
};

// CREATE a new product review
exports.createProductReview = async (req, res) => {
  try {
    const newReview = new ProductReview(req.body);
    const saved = await newReview.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ error: "Failed to create review" });
  }
};

// UPDATE a product review
exports.updateProductReview = async (req, res) => {
  try {
    const updated = await ProductReview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Review not found" });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).json({ error: "Failed to update review" });
  }
};

// DELETE a product review
exports.deleteProductReview = async (req, res) => {
  try {
    const deleted = await ProductReview.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ error: "Review not found" });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error("Error deleting review:", err);
    res.status(500).json({ error: "Failed to delete review" });
  }
};
