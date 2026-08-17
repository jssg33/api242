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
 *         _id:
 *           type: string
 *         campusId:
 *           type: number
 *         buildingId:
 *           type: number
 *         buildingName:
 *           type: string
 *         userId:
 *           type: string
 *         userName:
 *           type: string
 *         userStatus:
 *           type: string
 *         timestamp:
 *           type: string
 *         deviceserialnumber:
 *           type: string
 *         deviceIMEI1:
 *           type: string
 *         deviceIMEI2:
 *           type: string
 *         devicemodel:
 *           type: string
 *         deviceosversion:
 *           type: string
 *         devicetype:
 *           type: string
 *         devicecarrier:
 *           type: string
 *         deviceCLLP:
 *           type: string
 *         instance:
 *           type: string
 *         region:
 *           type: string
 *         collectorid:
 *           type: string
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
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
 *   get:
 *     summary: Get a single location history entry by MongoDB _id
 *     tags: [UserLocationHistory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single entry
 */
router.get('/:id', controller.getLocationById);

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

/* ---------------------------------------------------------
   NEW GET ENDPOINTS
--------------------------------------------------------- */

/**
 * @swagger
 * /api/userlocation/imei/{imei}:
 *   get:
 *     summary: Get all location history entries by IMEI number
 *     tags: [UserLocationHistory]
 *     parameters:
 *       - in: path
 *         name: imei
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entries matching IMEI
 */
router.get('/imei/:imei', controller.getLocationsByIMEI);

/**
 * @swagger
 * /api/userlocation/serial/{serial}:
 *   get:
 *     summary: Get all location history entries by device serial number
 *     tags: [UserLocationHistory]
 *     parameters:
 *       - in: path
 *         name: serial
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entries matching serial number
 */
router.get('/serial/:serial', controller.getLocationsBySerial);

/**
 * @swagger
 * /api/userlocation/cllp/{cllp}:
 *   get:
 *     summary: Get all location history entries by CLLP address
 *     tags: [UserLocationHistory]
 *     parameters:
 *       - in: path
 *         name: cllp
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entries matching CLLP address
 */
router.get('/cllp/:cllp', controller.getLocationsByCLLP);

module.exports = router;

