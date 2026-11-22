const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../middleware/validateParams");
router.param("id", objectIdParam);
const controller = require("../controllers/downloadLogController");

/**
 * @swagger
 * tags:
 *   name: DownloadLogs
 *   description: Software download tracking
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DownloadLog:
 *       type: object
 *       required:
 *         - downloadsource
 *         - date
 *         - userid
 *         - useremail
 *         - referralsource
 *       properties:
 *         _id:
 *           type: string
 *         downloadsource:
 *           type: string
 *         date:
 *           type: string
 *         userid:
 *           type: string
 *         useremail:
 *           type: string
 *           format: email
 *         referralsource:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /downloadlogs:
 *   get:
 *     summary: Get all download logs
 *     tags: [DownloadLogs]
 *     responses:
 *       200:
 *         description: List of download logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DownloadLog'
 *       500:
 *         description: Server error
 */
router.get("/", controller.getDownloadLogs);

/**
 * @swagger
 * /downloadlogs:
 *   post:
 *     summary: Create a download log entry
 *     tags: [DownloadLogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DownloadLog'
 *     responses:
 *       201:
 *         description: Download log created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DownloadLog'
 *       400:
 *         description: Validation error
 */
router.post("/", controller.createDownloadLog);

/**
 * @swagger
 * /downloadlogs/{id}:
 *   get:
 *     summary: Get a download log by ID
 *     tags: [DownloadLogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Download log found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DownloadLog'
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get("/:id", controller.getDownloadLogById);

/**
 * @swagger
 * /downloadlogs/{id}:
 *   put:
 *     summary: Update a download log
 *     tags: [DownloadLogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DownloadLog'
 *     responses:
 *       200:
 *         description: Download log updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DownloadLog'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Not found
 */
router.put("/:id", controller.updateDownloadLog);

/**
 * @swagger
 * /downloadlogs/{id}:
 *   delete:
 *     summary: Delete a download log
 *     tags: [DownloadLogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Download log deleted
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", controller.deleteDownloadLog);

module.exports = router;
