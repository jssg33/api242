// routes/songReviewRoutes.js
const express = require("express");
const router = express.Router();
const { createReview, getReviewsBySong } = require("../controllers/songReviewController");

/**
 * @swagger
 * tags:
 *   name: SongReviews
 *   description: User reviews for songs
 */

/**
 * @swagger
 * /api/songreviews:
 *   post:
 *     summary: Create a new song review
 *     tags: [SongReviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               songId:
 *                 type: string
 *                 example: "665f3b2c9a1e4c0012d9fabc"
 *               userId:
 *                 type: string
 *                 example: "user-123"
 *               rating:
 *                 type: number
 *                 example: 5
 *               reviewText:
 *                 type: string
 *                 example: "Amazing song, loved the production!"
 *     responses:
 *       201:
 *         description: Review created successfully
 *       500:
 *         description: Server error
 */
router.post("/", createReview);

/**
 * @swagger
 * /api/songreviews/song/{songId}:
 *   get:
 *     summary: Get all reviews for a specific song
 *     tags: [SongReviews]
 *     parameters:
 *       - in: path
 *         name: songId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the song
 *     responses:
 *       200:
 *         description: List of reviews for the song
 *       500:
 *         description: Server error
 */
router.get("/song/:songId", getReviewsBySong);

module.exports = router;
