const express = require("express");
const router = express.Router();
const controller = require("../controllers/userDeviceController");

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDevice:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         userId:
 *           type: string
 *         deviceserialnumber:
 *           type: string
 *         deviceIMEI1:
 *           type: string
 *         deviceIMEI2:
 *           type: string
 *         devicemodel:
 *           type: string
 *         devicetype:
 *           type: string
 *         deviceosversion:
 *           type: string
 *         devicecarrier:
 *           type: string
 *         deviceCLLP:
 *           type: string
 *         ownedByUser:
 *           type: boolean
 *         corporateAssetTag:
 *           type: string
 *         active:
 *           type: boolean
 *         nickname:
 *           type: string
 */

/**
 * @swagger
 * /api/userdevice:
 *   post:
 *     summary: Create a new device
 *     tags: [UserDevice]
 */
router.post("/", controller.createDevice);

/**
 * @swagger
 * /api/userdevice:
 *   get:
 *     summary: Get all devices
 *     tags: [UserDevice]
 */
router.get("/", controller.getAllDevices);

/**
 * @swagger
 * /api/userdevice/user/{userId}:
 *   get:
 *     summary: Get all devices for a user
 *     tags: [UserDevice]
 */
router.get("/user/:userId", controller.getDevicesByUser);

/**
 * @swagger
 * /api/userdevice/{id}:
 *   get:
 *     summary: Get a device by ID
 *     tags: [UserDevice]
 */
router.get("/:id", controller.getDeviceById);

/**
 * @swagger
 * /api/userdevice/{id}:
 *   put:
 *     summary: Update a device
 *     tags: [UserDevice]
 */
router.put("/:id", controller.updateDevice);

/**
 * @swagger
 * /api/userdevice/{id}:
 *   delete:
 *     summary: Delete a device
 *     tags: [UserDevice]
 */
router.delete("/:id", controller.deleteDevice);

module.exports = router;
