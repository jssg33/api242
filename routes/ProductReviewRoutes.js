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
 *         - rating
 *         - review
 *       properties:
 *         uid:
 *           type: string
 *           description: "User identifier (guest ID, GUID, or MongoDB ObjectId as string)"
 *         uidGUID:
 *           type: string
 *           description: "Optional GUID for cross-system identity"
 *         productId:
 *           type: string
 *           description: "MongoDB ObjectId of the product"
 *         productSKU:
 *           type: string
 *           description: "SKU string used when MongoDB productId is not available"
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *         title:
 *           type: string
 *         review:
 *           type: string
 *         verifiedPurchase:
 *           type: boolean
 *       example:
 *         uid: "guest-33"
 *         productId: "69da6964c8294f8fb7ed38d4"
 *         productSKU: "SAP-CRYSTAL-001"
 *         rating: 5
 *         title: "We Love Crystal"
 *         review: "This was exactly what I needed"
 *         verifiedPurchase: true
 */

/**
 * @swagger
 * /productreviews:
 *   get:
 *     summary: Get all product reviews (optionally filter by productId or productSKU)
 *     tags: [ProductReviews]
 *     parameters:
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *         description: "MongoDB ObjectId of the product"
 *       - in: query
 *         name: productSKU
 *         schema:
 *           type: string
 *         description: "SKU string of the product"
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
