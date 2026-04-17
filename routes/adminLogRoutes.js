const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminLogController');

/**
 * @swagger
 * components:
 *   schemas:
 *     AdminLog:
 *       type: object
 *       required:
 *         - description
 *         - mongoid
 *       properties:
 *         id:
 *           type: integer
 *         userid:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         description:
 *           type: string
 *         mongoid:
 *           type: string
 *         acknowledged:
 *           type: string
 *         techid:
 *           type: integer
 *         managerescid:
 *           type: integer
 *         threatlevel:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: AdminLog
 *   description: API for managing admin logs
 */

/**
 * @swagger
 * /api/adminlogs:
 *   get:
 *     summary: Get all admin logs
 *     tags: [AdminLog]
 *     responses:
 *       200:
 *         description: List of admin logs
 */
router.get('/', controller.getAllAdminLogs);

/**
 * @swagger
 * /api/adminlogs/{id}:
 *   get:
 *     summary: Get an admin log by numeric ID
 *     tags: [AdminLog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Admin log found
 *       404:
 *         description: Admin log not found
 */
router.get('/:id', controller.getAdminLogById);

/**
 * @swagger
 * /api/adminlogs:
 *   post:
 *     summary: Create a new admin log
 *     tags: [AdminLog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminLog'
 *     responses:
 *       201:
 *         description: Admin log created
 */
router.post('/', controller.createAdminLog);


// -----------------------------------------------------
// NEW MONGOID-BASED ROUTES
// -----------------------------------------------------

/**
 * @swagger
 * /api/adminlogs/mongo/{mongoid}:
 *   get:
 *     summary: Get all admin logs by mongoid
 *     tags: [AdminLog]
 *     parameters:
 *       - in: path
 *         name: mongoid
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Admin logs found
 *       404:
 *         description: No logs found for this mongoid
 */
router.get('/mongo/:mongoid', controller.getAdminLogsByMongoId);

/**
 * @swagger
 * /api/adminlogs/mongo/one/{mongoid}:
 *   get:
 *     summary: Get a single admin log by mongoid
 *     tags: [AdminLog]
 *     parameters:
 *       - in: path
 *         name: mongoid
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Admin log found
 *       404:
 *         description: Admin log not found
 */
router.get('/mongo/one/:mongoid', controller.getAdminLogByMongoId);

/**
 * @swagger
 * /api/adminlogs/mongo/{mongoid}:
 *   put:
 *     summary: Update an admin log by mongoid
 *     tags: [AdminLog]
 *     parameters:
 *       - in: path
 *         name: mongoid
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminLog'
 *     responses:
 *       200:
 *         description: Admin log updated
 *       404:
 *         description: Admin log not found
 */
router.put('/mongo/:mongoid', controller.updateAdminLogByMongoId);

/**
 * @swagger
 * /api/adminlogs/mongo/{mongoid}:
 *   delete:
 *     summary: Delete an admin log by mongoid
 *     tags: [AdminLog]
 *     parameters:
 *       - in: path
 *         name: mongoid
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Admin log deleted
 *       404:
 *         description: Admin log not found
 */
router.delete('/mongo/:mongoid', controller.deleteAdminLogByMongoId);


module.exports = router;
