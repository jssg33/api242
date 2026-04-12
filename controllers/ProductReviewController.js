const mongoose = require("mongoose");
const ProductReview = require("../models/ProductReview");

// Helper: safely convert to ObjectId
const toObjectId = (value) => {
  if (!value) return null;
  return mongoose.Types.ObjectId.isValid(value)
    ? new mongoose.Types.ObjectId(value)
    : null;
};

// GET all reviews (supports filtering)
exports.getAllProductReviews = async (req, res) => {
  try {
    const filter = {};

    // Product filters
    if (req.query.productId) filter.productId = toObjectId(req.query.productId);
    if (req.query.productGUID) filter.productGUID = req.query.productGUID;

    // Park filters
    if (req.query.parkId) filter.parkId = toObjectId(req.query.parkId);
    if (req.query.parkGUID) filter.parkGUID = req.query.parkGUID;
    if (req.query.parkLEGACY) filter.parkLEGACY = req.query.parkLEGACY;

    // User filters
    if (req.query.uid) filter.uid = toObjectId(req.query.uid);
    if (req.query.uidGUID) filter.uidGUID = req.query.uidGUID;
    if (req.query.userId) filter.userId = req.query.userId;

    const reviews = await Review.find(filter).sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching product reviews:", err);
    res.status(500).json({ error: "Failed to fetch product reviews" });
  }
};

// GET a single review by ID
exports.getProductReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(review);
  } catch (err) {
    console.error("Error fetching review:", err);
    res.status(500).json({ error: "Failed to fetch review" });
  }
};

// CREATE a new review
exports.createProductReview = async (req, res) => {
  try {
    const body = { ...req.body };

    // Normalize ObjectId fields
    body.uid = toObjectId(body.uid);
    body.productId = toObjectId(body.productId);
    body.parkId = toObjectId(body.parkId);

    // Validate required fields
    if (!body.rating || !body.review) {
      return res.status(400).json({
        error: "rating and review are required fields"
      });
    }

    const newReview = new Review(body);
    const saved = await newReview.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating review:", err);

    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }

    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid ObjectId format" });
    }

    res.status(500).json({ error: "Failed to create review" });
  }
};

// UPDATE a review
exports.updateProductReview = async (req, res) => {
  try {
    const body = { ...req.body };

    // Normalize ObjectId fields
    body.uid = toObjectId(body.uid);
    body.productId = toObjectId(body.productId);
    body.parkId = toObjectId(body.parkId);

    const updated = await Review.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating review:", err);

    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: "Failed to update review" });
  }
};

// DELETE a review
exports.deleteProductReview = async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error("Error deleting review:", err);
    res.status(500).json({ error: "Failed to delete review" });
  }
};

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
