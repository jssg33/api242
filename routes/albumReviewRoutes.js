const express = require("express");
const router = express.Router();
const { createAlbumReview, getReviewsByAlbum } = require("../controllers/albumReviewController");

/**
 * @swagger
 * tags:
 *   name: AlbumReviews
 *   description: User reviews for albums
 */

/**
 * @swagger
 * /api/albumreviews:
 *   post:
 *     summary: Create a new album review
 *     tags: [AlbumReviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               albumId:
 *                 type: string
 *                 example: "665f3b2c9a1e4c0012d9fabc"
 *               userId:
 *                 type: string
 *                 example: "user-123"
 *               rating:
 *                 type: number
 *                 example: 4
 *               reviewText:
 *                 type: string
 *                 example: "Solid album with great production."
 *     responses:
 *       201:
 *         description: Album review created successfully
 *       500:
 *         description: Server error
 */
router.post("/", createAlbumReview);

/**
 * @swagger
 * /api/albumreviews/album/{albumId}:
 *   get:
 *     summary: Get all reviews for a specific album
 *     tags: [AlbumReviews]
 *     parameters:
 *       - in: path
 *         name: albumId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the album
 *     responses:
 *       200:
 *         description: List of album reviews
 *       500:
 *         description: Server error
 */
router.get("/album/:albumId", getReviewsByAlbum);

module.exports = router;
