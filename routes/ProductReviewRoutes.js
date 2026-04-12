const express = require("express");
const router = express.Router();
const ProductReviewController = require("../controllers/ProductReviewController");

/**
 * @swagger
 * tags:
 *   name: ProductReviews
 *   description: Unified product + park + legacy review system
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - rating
 *         - review
 *       properties:
 *         uid:
 *           type: string
 *           nullable: true
 *           description: "MongoDB ObjectId of the user (new system)"
 *         uidGUID:
 *           type: string
 *           nullable: true
 *           description: "GUID user identifier (cross-system)"
 *
 *         userId:
 *           type: string
 *           nullable: true
 *           description: "Legacy user identifier (string)"
 *
 *         productId:
 *           type: string
 *           nullable: true
 *           description: "MongoDB ObjectId of the product"
 *         productGUID:
 *           type: string
 *           nullable: true
 *           description: "String-based product GUID or external product identifier"
 *
 *         parkId:
 *           type: string
 *           nullable: true
 *           description: "MongoDB ObjectId of the park"
 *         parkGUID:
 *           type: string
 *           nullable: true
 *           description: "String-based park GUID"
 *         parkLEGACY:
 *           type: string
 *           nullable: true
 *           description: "Legacy park identifier"
 *
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: "Rating from 1 to 5"
 *
 *         title:
 *           type: string
 *           nullable: true
 *         review:
 *           type: string
 *           description: "Review text"
 *
 *         verifiedPurchase:
 *           type: boolean
 *           nullable: true
 *
 *         dateWritten:
 *           type: string
 *           nullable: true
 *         dateVisited:
 *           type: string
 *           nullable: true
 *
 *       example:
 *         uid: "67a1b2c3d4e5f6a7b8c9d0e1"
 *         uidGUID: null
 *         userId: "legacy-user-001"
 *         productId: "69da6964c8294f8fb7ed38d4"
 *         productGUID: "SAP-CRYSTAL-001"
 *         parkId: null
 *         parkGUID: null
 *         parkLEGACY: null
 *         rating: 5
 *         title: "Crystal Light Masters Weekend... Amazing product"
 *         review: "Exceeded expectations!"
 *         verifiedPurchase: true
 *         dateWritten: "2026-04-12"
 *         dateVisited: "2026-04-10"
 */

/**
 * @swagger
 * /productreviews:
 *   get:
 *     summary: Get all reviews (product + park + legacy)
 *     tags: [ProductReviews]
 *     parameters:
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *         description: "Filter by product MongoDB ObjectId"
 *       - in: query
 *         name: productGUID
 *         schema:
 *           type: string
 *         description: "Filter by product GUID"
 *       - in: query
 *         name: parkId
 *         schema:
 *           type: string
 *         description: "Filter by park MongoDB ObjectId"
 *       - in: query
 *         name: parkGUID
 *         schema:
 *           type: string
 *         description: "Filter by park GUID"
 *       - in: query
 *         name: parkLEGACY
 *         schema:
 *           type: string
 *         description: "Filter by legacy park ID"
 *     responses:
 *       200:
 *         description: List of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get("/productreviews", ProductReviewController.getAllProductReviews);

/**
 * @swagger
 * /productreviews/{id}:
 *   get:
 *     summary: Get a single review by ID
 *     tags: [ProductReviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 */
router.get("/productreviews/:id", ProductReviewController.getProductReviewById);

/**
 * @swagger
 * /productreviews:
 *   post:
 *     summary: Create a new review (product + park + legacy)
 *     tags: [ProductReviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/productreviews", ProductReviewController.createProductReview);

/**
 * @swagger
 * /productreviews/{id}:
 *   put:
 *     summary: Update a review
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
 *             $ref: '#/components/schemas/Review'
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
 *     summary: Delete a review
 *     tags: [ProductReviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router.delete("/productreviews/:id", ProductReviewController.deleteProductReview);

module.exports = router;
