const express = require('express');
const router = express.Router();
const controller = require('../controllers/userLocationHistoryController');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLocationHistory:
 *       type: object
 *       required:
 *         - userId
 *         - latitude
 *         - longitude
 *       properties:
 *         buildingId:
 *           type: number
 *         buildingName:
 *           type: string
 *         userId:
 *           type: string
 *         userName:
 *           type: string
 *         timestamp:
 *           type: number
 *           description: Unix timestamp
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 *         syncDate:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/userLocationHistory:
 *   post:
 *     summary: Create a new user location history entry
 *     tags: [UserLocationHistory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLocationHistory'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', controller.createLocation);

/**
 * @swagger
 * /api/userLocationHistory:
 *   get:
 *     summary: Get all user location history entries
 *     tags: [UserLocationHistory]
 *     responses:
 *       200:
 *         description: List of entries
 */
router.get('/', controller.getAllLocations);

/**
 * @swagger
 * /api/userLocationHistory/user/{userId}:
 *   get:
 *     summary: Get location history for a specific user
 *     tags: [UserLocationHistory]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User history list
 */
router.get('/user/:userId', controller.getLocationsByUser);

/**
 * @swagger
 * /api/userLocationHistory/{id}:
 *   delete:
 *     summary: Delete a location history entry
 *     tags: [UserLocationHistory]
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
router.delete('/:id', controller.deleteLocation);

module.exports = router;
