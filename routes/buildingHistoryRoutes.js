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
 *         - buildingId
 *         - buildingName
 *         - timestamp
 *       properties:
 *         buildingId:
 *           type: number
 *           example: 101
 *         buildingName:
 *           type: string
 *           example: "Main Office"
 *         timestamp:
 *           type: number
 *           description: Unix timestamp
 *           example: 1717438293
 *         latitude:
 *           type: number
 *           example: 34.0007
 *         longitude:
 *           type: number
 *           example: -81.0348
 *         syncDate:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/building-history:
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
 *         description: Created successfully
 */
router.post('/', controller.createBuildingHistory);

/**
 * @swagger
 * /api/building-history:
 *   get:
 *     summary: Get all building history entries
 *     tags: [BuildingHistory]
 *     responses:
 *       200:
 *         description: List of entries
 */
router.get('/', controller.getAllBuildingHistory);

/**
 * @swagger
 * /api/building-history/{buildingId}:
 *   get:
 *     summary: Get history for a specific building
 *     tags: [BuildingHistory]
 *     parameters:
 *       - in: path
 *         name: buildingId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of entries for the building
 */
router.get('/:buildingId', controller.getHistoryByBuildingId);

/**
 * @swagger
 * /api/building-history/delete/{id}:
 *   delete:
 *     summary: Delete a building history entry by ID
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
router.delete('/delete/:id', controller.deleteBuildingHistory);

module.exports = router;
