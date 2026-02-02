const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

/**
 * @openapi
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - productId
 *         - userId
 *         - rating
 *         - review
 *       properties:
 *         id:
 *           type: string
 *         productId:
 *           type: string
 *           description: MongoDB ObjectId of the product
 *         userId:
 *           type: string
 *           description: MongoDB ObjectId of the user
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
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         productId: "67a1b2c3d4e5f6a7b8c9d0e1"
 *         userId: "66f1a2b3c4d5e6f7a8b9c0d1"
 *         rating: 5
 *         title: "Amazing product"
 *         review: "Exceeded expectations!"
 *         verifiedPurchase: true
 */

/**
 * @openapi
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags:
 *       - Reviews
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
router.get("/", reviewController.getAllReviews);

/**
 * @openapi
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags:
 *       - Reviews
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
router.get("/:id", reviewController.getReviewById);

/**
 * @openapi
 * /reviews/product/{productId}:
 *   get:
 *     summary: Get all reviews for a product
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews for the product
 */
router.get("/product/:productId", reviewController.getReviewsByProduct);

/**
 * @openapi
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags:
 *       - Reviews
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review created
 */
router.post("/", reviewController.createReview);

/**
 * @openapi
 * /reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags:
 *       - Reviews
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
router.put("/:id", reviewController.updateReview);

/**
 * @openapi
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags:
 *       - Reviews
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
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
