const express = require('express');
const router = express.Router();
const controller = require('../controllers/musicHistoryController');

/**
 * @swagger
 * components:
 *   schemas:
 *     MusicHistory:
 *       type: object
 *       required:
 *         - userid
 *         - instanceid
 *         - title
 *         - artist
 *       properties:
 *         _id:
 *           type: string
 *         userid:
 *           type: string
 *           description: Mongo user ID
 *         instanceid:
 *           type: string
 *           description: Unique song instance ID
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
 *         playCount:
 *           type: number
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *         lastPlayed:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/musichistory:
 *   post:
 *     summary: Create or increment a music history record
 *     tags: [MusicHistory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MusicHistory'
 *     responses:
 *       201:
 *         description: Created or updated
 */
router.post('/', controller.createOrIncrement);

/**
 * @swagger
 * /api/musichistory:
 *   get:
 *     summary: Get all music history records
 *     tags: [MusicHistory]
 *     responses:
 *       200:
 *         description: List of music history records
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/musichistory/user/{userid}:
 *   get:
 *     summary: Get all music history records for a specific user
 *     tags: [MusicHistory]
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User music history list
 */
router.get('/user/:userid', controller.getByUser);

/**
 * @swagger
 * /api/musichistory/{id}:
 *   get:
 *     summary: Get a single music history record by ID
 *     tags: [MusicHistory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single music history record
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /api/musichistory/{id}/rating:
 *   patch:
 *     summary: Update rating for a music history record
 *     tags: [MusicHistory]
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
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 5
 *     responses:
 *       200:
 *         description: Rating updated
 */
router.patch('/:id/rating', controller.updateRating);

/**
 * @swagger
 * /api/musichistory/{id}:
 *   delete:
 *     summary: Delete a music history record by ID
 *     tags: [MusicHistory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete('/:id', controller.deleteById);

/**
 * @swagger
 * /api/musichistory/user/{userid}:
 *   delete:
 *     summary: Delete all music history records for a specific user
 *     tags: [MusicHistory]
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: All user music history deleted
 */
router.delete('/user/:userid', controller.deleteByUser);

module.exports = router;
