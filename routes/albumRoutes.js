// routes/albumRoutes.js
const express = require("express");
const router = express.Router();
const {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum
} = require("../controllers/albumController");

/**
 * @swagger
 * tags:
 *   name: Albums
 *   description: Album management
 */

/**
 * @swagger
 * /api/albums:
 *   post:
 *     summary: Create a new album
 *     tags: [Albums]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string, example: "Thriller" }
 *               artist: { type: string, example: "Michael Jackson" }
 *               year: { type: number, example: 1982 }
 *               genre: { type: string, example: "Pop" }
 *               cover: { type: string, example: "https://image.url" }
 *               youtube: { type: string, example: "https://youtube.com/..." }
 *               userid: { type: string, example: "user-123" }
 *               instanceid: { type: string, example: "instance-456" }
 *     responses:
 *       201: { description: Album created }
 *       500: { description: Server error }
 */
router.post("/", createAlbum);

/**
 * @swagger
 * /api/albums:
 *   get:
 *     summary: Get all albums
 *     tags: [Albums]
 *     responses:
 *       200: { description: List of albums }
 *       500: { description: Server error }
 */
router.get("/", getAllAlbums);

/**
 * @swagger
 * /api/albums/{id}:
 *   get:
 *     summary: Get an album by ID
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Album found }
 *       404: { description: Album not found }
 *       500: { description: Server error }
 */
router.get("/:id", getAlbumById);

/**
 * @swagger
 * /api/albums/{id}:
 *   put:
 *     summary: Update an album
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200: { description: Album updated }
 *       404: { description: Album not found }
 *       500: { description: Server error }
 */
router.put("/:id", updateAlbum);

/**
 * @swagger
 * /api/albums/{id}:
 *   delete:
 *     summary: Delete an album
 *     tags: [Albums]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Album deleted }
 *       404: { description: Album not found }
 *       500: { description: Server error }
 */
router.delete("/:id", deleteAlbum);

module.exports = router;
