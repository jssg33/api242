const express = require("express");
const router = express.Router();
const SongsController = require("../controllers/SongsController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Song:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         artist:
 *           type: string
 *         album:
 *           type: string
 *         year:
 *           type: number
 *         genre:
 *           type: string
 *         cover:
 *           type: string
 *         youtube:
 *           type: string
 *         userid:
 *           type: string
 *         instanceid:
 *           type: string
 *       example:
 *         title: "Thunderstruck"
 *         artist: "AC/DC"
 *         album: "The Razors Edge"
 *         year: 1990
 *         genre: "Metal"
 *         cover: "thunderstruck.jpg"
 *         youtube: "v2AC41dglnM?si=Wu2TgrTJkJzmuzkd"
 *         userid: "user_12345"
 *         instanceid: "instance_001"
 */

/**
 * @swagger
 * /api/songs:
 *   post:
 *     summary: Create a new song
 *     tags: [Songs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Song'
 *     responses:
 *       201:
 *         description: Song created
 */
router.post("/", SongsController.createSong);

/**
 * @swagger
 * /api/songs/bulk:
 *   post:
 *     summary: Create multiple songs at once
 *     tags: [Songs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Song'
 *     responses:
 *       201:
 *         description: Songs created
 */
router.post("/bulk", SongsController.createManySongs);

/**
 * @swagger
 * /api/songs:
 *   get:
 *     summary: Get all songs
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: List of songs
 */
router.get("/", SongsController.getAllSongs);

/**
 * @swagger
 * /api/songs/user/{userid}:
 *   get:
 *     summary: Get songs by user ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Songs for the user
 */
router.get("/user/:userid", SongsController.getSongsByUser);

/**
 * @swagger
 * /api/songs/instance/{instanceid}:
 *   get:
 *     summary: Get songs by instance ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: instanceid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Songs for the instance
 */
router.get("/instance/:instanceid", SongsController.getSongsByInstance);

/**
 * @swagger
 * /api/songs/{id}:
 *   get:
 *     summary: Get a song by ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Song data
 */
router.get("/:id", SongsController.getSongById);

/**
 * @swagger
 * /api/songs/{id}:
 *   put:
 *     summary: Update a song
 *     tags: [Songs]
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
 *             $ref: '#/components/schemas/SSong'
 *     responses:
 *       200:
 *         description: Updated song
 */
router.put("/:id", SongsController.updateSong);

/**
 * @swagger
 * /api/songs/{id}:
 *   delete:
 *     summary: Delete a song
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Song deleted
 */
router.delete("/:id", SongsController.deleteSong);

module.exports = router;
