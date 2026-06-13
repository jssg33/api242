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
 *           type: string
 *           description: Stored as a string. Any format allowed.
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
 * /api/userlocation:
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
 * /api/userlocation/user/{userId}:
 *   post:
 *     summary: Create a new user location entry for a specific user
 *     tags: [UserLocationHistory]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
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
router.post('/user/:userId', controller.createLocationByUserId);

/**
 * @swagger
 * /api/userlocation:
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
 * /api/userlocation/user/{userId}:
 *   get:
 *     summary: Get all location history entries for a specific user
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
 * /api/userlocation/{id}:
 *   delete:
 *     summary: Delete a location history entry by MongoDB _id
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

/**
 * @swagger
 * /api/userlocation/user/{userId}:
 *   delete:
 *     summary: Delete all location history entries for a specific user
 *     tags: [UserLocationHistory]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: All user entries deleted
 */
router.delete('/user/:userId', controller.deleteByUserId);

module.exports = router;
