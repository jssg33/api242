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
 *         - id
 *         - description
 *         - noticeDatetime
 *         - noticetype
 *         - emailgwtype
 *         - userid
 *         - useridstring
 *         - emailaddress
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserNotice'
 */
router.get('/', controller.getAllNotices);

/**
 * @swagger
 * /api/notices/{id}:
 *   get:
 *     summary: Get a notice by ID
 *     tags: [UserNotices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single notice
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotice'
 *       404:
 *         description: Notice not found
 */
router.get('/:id', controller.getNoticeById);

/**
 * @swagger
 * /api/notices:
 *   post:
 *     summary: Create a new notice
 *     tags: [UserNotices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserNotice'
 *     responses:
 *       201:
 *         description: Notice created
 */
router.post('/', controller.createNotice);

/**
 * @swagger
 * /api/notices/{id}:
 *   put:
 *     summary: Update a notice
 *     tags: [UserNotices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserNotice'
 *     responses:
 *       200:
 *         description: Notice updated
 *       404:
 *         description: Notice not found
 */
router.put('/:id', controller.updateNotice);

/**
 * @swagger
 * /api/notices/{id}:
 *   delete:
 *     summary: Delete a notice
 *     tags: [UserNotices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notice deleted
 *       404:
 *         description: Notice not found
 */
router.delete('/:id', controller.deleteNotice);

module.exports = router;

