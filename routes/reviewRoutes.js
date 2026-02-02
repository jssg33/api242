const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// GET all reviews
router.get("/", reviewController.getAllReviews);

// GET review by ID
router.get("/:id", reviewController.getReviewById);

// GET all reviews for a product
router.get("/product/:productId", reviewController.getReviewsByProduct);

// CREATE review
router.post("/", reviewController.createReview);

// UPDATE review
router.put("/:id", reviewController.updateReview);

// DELETE review
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
