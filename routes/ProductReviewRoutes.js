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
 * components:
 *   schemas:
 *     ProductReview:
 *       type: object
 *       required:
 *         - uid
 *         - productId
 *         - rating
 *         - review
 *       properties:
 *         uid:
 *           type: string
 *         productId:
 *           type: string
 *         rating:
 *           type: number
 *         title:
 *           type: string
 *         review:
 *           type: string
 *         verifiedPurchase:
 *           type: boolean
 *       example:
 *         uid: "user123"
 *         productId: "65f1a9c2e4b8c1a9d3f1b123"
 *         rating: 5
 *         title: "Amazing product"
 *         review: "This was exactly what I needed"
 *         verifiedPurchase: true
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductReview'
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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product review found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductReview'
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
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductReview'
 *     responses:
 *       201:
 *         description: Review created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductReview'
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
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductReview'
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
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted
 *       404:
 *         description: Review not found
 */
router.delete("/productreviews/:id", ProductReviewController.deleteProductReview);

module.exports = router;
