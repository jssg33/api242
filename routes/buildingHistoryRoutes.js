const express = require('express');
const router = express.Router();
const controller = require('../controllers/buildingHistoryController');

// Debug to verify controller loaded correctly
console.log("BuildingHistoryController loaded:", controller);

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
 *         description: 
 *           type: String
 *         userId:
 *           type: string
 *         userName:
 *           type: string
 *         timestamp:
 *           type: number
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
 */
router.post('/', controller.createBuildingHistory);

/**
 * @swagger
 * /api/buildingHistory:
 *   get:
 *     summary: Get all building history entries
 *     tags: [BuildingHistory]
 */
router.get('/', controller.getAllBuildingHistory);

/**
 * @swagger
 * /api/buildingHistory/building/{buildingId}:
 *   get:
 *     summary: Get building history by buildingId
 *     tags: [BuildingHistory]
 */
router.get('/building/:buildingId', controller.getHistoryByBuildingId);

/**
 * @swagger
 * /api/buildingHistory/{id}:
 *   delete:
 *     summary: Delete a building history entry
 *     tags: [BuildingHistory]
 */
router.delete('/:id', controller.deleteBuildingHistory);

module.exports = router;
