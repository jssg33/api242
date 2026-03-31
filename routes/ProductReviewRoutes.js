const express = require("express");
const router = express.Router();
const ProductReviewController = require("../controllers/ProductReviewController");

/**
 * @swagger
 * tags:
 *   name: ProductReviews
 *   description: CRUD operations for product reviews
 */

/**
 * @swagger
 * /productreviews:
 *   get:
 *     summary: Get all product reviews
 *     tags: [ProductReviews]
 *     responses:
 *       200:
 *         description: List of product reviews
 */
router.get("/productreviews", ProductReviewController.getAllProductReviews);

/**
 * @swagger
 * /productreviews/{id}:
 *   get:
 *     summary: Get a product review by ID
 *     tags: [ProductReviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Product review found
 *       404:
 *         description: Review not found
 */
router.get("/productreviews/:id", ProductReviewController.getProductReviewById);

/**
 * @swagger
 * /productreviews:
 *   post:
 *     summary: Create a new product review
 *     tags: [ProductReviews]
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Review created
 */
router.post("/productreviews", ProductReviewController.createProductReview);

/**
 * @swagger
 * /productreviews/{id}:
 *   put:
 *     summary: Update a product review
 *     tags: [ProductReviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Review updated
 *       404:
 *         description: Review not found
 */
router.put("/productreviews/:id", ProductReviewController.updateProductReview);

/**
 * @swagger
 * /productreviews/{id}:
 *   delete:
 *     summary: Delete a product review
 *     tags: [ProductReviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Review deleted
 *       404:
 *         description: Review not found
 */
router.delete("/productreviews/:id", ProductReviewController.deleteProductReview);

module.exports = router;
