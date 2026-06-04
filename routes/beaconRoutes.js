const express = require('express');
const router = express.Router();
const controller = require('../controllers/beaconController');

/**
 * @swagger
 * tags:
 *   name: Beacons
 *   description: Aruba Bluetooth Beacon Management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Beacon:
 *       type: object
 *       required:
 *         - serialNumber
 *         - macAddress
 *         - buildingId
 *         - floor
 *         - room
 *       properties:
 *         id:
 *           type: string
 *         serialNumber:
 *           type: string
 *         macAddress:
 *           type: string
 *         buildingId:
 *           type: string
 *         floor:
 *           type: string
 *         room:
 *           type: string
 *         description:
 *           type: string
 *         instance:
 *           type: string
 *         region:
 *           type: string
 *         beaconType:
 *           type: string
 *           enum: [Aruba, iBeacon, Eddystone]
 *         installDate:
 *           type: string
 *           format: date
 *         lastSeen:
 *           type: string
 *           format: date
 *         batteryLevel:
 *           type: number
 *         status:
 *           type: string
 *           enum: [active, inactive, maintenance, retired]
 */

/**
 * @swagger
 * /api/beacons:
 *   get:
 *     summary: Get all beacons
 *     tags: [Beacons]
 *     responses:
 *       200:
 *         description: List of beacons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Beacon'
 */
router.get('/', controller.getBeacons);

/**
 * @swagger
 * /api/beacons/{id}:
 *   get:
 *     summary: Get a beacon by ID
 *     tags: [Beacons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Beacon found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Beacon'
 *       404:
 *         description: Beacon not found
 */
router.get('/:id', controller.getBeaconById);

/**
 * @swagger
 * /api/beacons:
 *   post:
 *     summary: Create a new beacon
 *     tags: [Beacons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Beacon'
 *     responses:
 *       201:
 *         description: Beacon created
 */
router.post('/', controller.createBeacon);

/**
 * @swagger
 * /api/beacons/{id}:
 *   put:
 *     summary: Update a beacon
 *     tags: [Beacons]
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
 *             $ref: '#/components/schemas/Beacon'
 *     responses:
 *       200:
 *         description: Beacon updated
 *       404:
 *         description: Beacon not found
 */
router.put('/:id', controller.updateBeacon);

/**
 * @swagger
 * /api/beacons/{id}:
 *   delete:
 *     summary: Delete a beacon
 *     tags: [Beacons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Beacon deleted
 *       404:
 *         description: Beacon not found
 */
router.delete('/:id', controller.deleteBeacon);

module.exports = router;
