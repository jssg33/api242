const express = require('express');
const router = express.Router();
const controller = require('../controllers/userNoticeController');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserNotice:
 *       type: object
 *       required:
 *         - description
 *         - noticetype
 *         - mongoid
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         description:
 *           type: string
 *           example: "Email gateway failure"
 *         noticeDatetime:
 *           type: string
 *           format: date-time
 *           example: "2026-02-04T17:00:31.043Z"
 *         noticetype:
 *           type: string
 *           example: "Error"
 *         emailgwtype:
 *           type: string
 *           example: "SMTP"
 *         mongoid:
 *           type: string
 *           example: "65f1c2b9e4a1a3c9d1234567"
 *         userid:
 *           type: integer
 *           example: 42
 *         useridstring:
 *           type: string
 *           example: "user42"
 *         emailaddress:
 *           type: string
 *           example: "user42@example.com"
 */

/**
 * @swagger
 * tags:
 *   name: UserNotices
 *   description: API for managing user notices
 */

/**
 * @swagger
 * /api/notices:
 *   get:
 *     summary: Get all user notices
 *     tags: [UserNotices]
 *     responses:
 *       200:
 *         description: List of notices
 */
router.get('/', controller.getAllNotices);

/**
 * @swagger
 * /api/notices/{id}:
 *   get:
 *     summary: Get a notice by numeric ID
 *     tags: [UserNotices]
 */
router.get('/:id', controller.getNoticeById);

/**
 * @swagger
 * /api/notices:
 *   post:
 *     summary: Create a new notice
 *     tags: [UserNotices]
 */
router.post('/', controller.createNotice);

/**
 * @swagger
 * /api/notices/{id}:
 *   put:
 *     summary: Update a notice by numeric ID
 *     tags: [UserNotices]
 */
router.put('/:id', controller.updateNotice);

/**
 * @swagger
 * /api/notices/{id}:
 *   delete:
 *     summary: Delete a notice by numeric ID
 *     tags: [UserNotices]
 */
router.delete('/:id', controller.deleteNotice);



// -----------------------------------------------------
// NEW MONGOID-BASED ROUTES
// -----------------------------------------------------

/**
 * @swagger
 * /api/notices/mongo/{mongoid}:
 *   get:
 *     summary: Get all notices by mongoid
 *     tags: [UserNotices]
 *     parameters:
 *       - in: path
 *         name: mongoid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notices for the given mongoid
 */
router.get('/mongo/:mongoid', controller.getNoticesByMongoId);

/**
 * @swagger
 * /api/notices/mongo/one/{mongoid}:
 *   get:
 *     summary: Get a single notice by mongoid
 *     tags: [UserNotices]
 */
router.get('/mongo/one/:mongoid', controller.getNoticeByMongoId);

/**
 * @swagger
 * /api/notices/mongo/{mongoid}:
 *   put:
 *     summary: Update a notice by mongoid
 *     tags: [UserNotices]
 */
router.put('/mongo/:mongoid', controller.updateNoticeByMongoId);

/**
 * @swagger
 * /api/notices/mongo/{mongoid}:
 *   delete:
 *     summary: Delete a notice by mongoid
 *     tags: [UserNotices]
 */
router.delete('/mongo/:mongoid', controller.deleteNoticeByMongoId);


module.exports = router;


