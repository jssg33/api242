const express = require('express');
const router = express.Router();
const controller = require('../controllers/buildingHistoryController');

/**
 * @swagger
 * components:
 *   schemas:
 *     BuildingHistory:
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
 * /api/buildingHistory:
 *   post:
 *     summary: Create a new building history entry
 *     tags: [BuildingHistory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BuildingHistory'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', controller.createHistory);

/**
 * @swagger
 * /api/buildingHistory:
 *   get:
 *     summary: Get all building history entries
 *     tags: [BuildingHistory]
 *     responses:
 *       200:
 *         description: List of building history entries
 */
router.get('/', controller.getAllHistory);

/**
 * @swagger
 * /api/buildingHistory/user/{userId}:
 *   get:
 *     summary: Get building history entries for a specific user
 *     tags: [BuildingHistory]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User-specific building history
 */
router.get('/user/:userId', controller.getHistoryByUser);

/**
 * @swagger
 * /api/buildingHistory/{id}:
 *   delete:
 *     summary: Delete a building history entry
 *     tags: [BuildingHistory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete('/:id', controller.deleteHistory);

module.exports = router;
