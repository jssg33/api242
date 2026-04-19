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
 *         - mongoid
 *         - username
 *       properties:
 *         id:
 *           type: number
 *         description:
 *           type: string
 *         noticeDatetime:
 *           type: string
 *           format: date-time
 *         noticetype:
 *           type: string
 *         emailgwtype:
 *           type: string
 *         mongoid:
 *           type: string
 *         isDeleted:
 *           type: boolean
 *           default: false
 *         username:
 *           type: string
 *         userid:
 *           type: number
 *         useridstring:
 *           type: string
 *         emailaddress:
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
 *     summary: Get a notice by numeric ID
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserNotice'
 *       400:
 *         description: Invalid input
 */
router.post('/', controller.createNotice);

/**
 * @swagger
 * /api/notices/{id}:
 *   put:
 *     summary: Update a notice by numeric ID
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
 *     summary: Delete a notice by numeric ID
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


// -----------------------------------------------------
// MONGOID-BASED ROUTES
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserNotice'
 *       404:
 *         description: No notices found
 */
router.get('/mongo/:mongoid', controller.getNoticesByMongoId);

/**
 * @swagger
 * /api/notices/mongo/one/{mongoid}:
 *   get:
 *     summary: Get a single notice by mongoid
 *     tags: [UserNotices]
 *     parameters:
 *       - in: path
 *         name: mongoid
 *         required: true
 *         schema:
 *           type: string
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
router.get('/mongo/one/:mongoid', controller.getNoticeByMongoId);

/**
 * @swagger
 * /api/notices/mongo/{mongoid}:
 *   put:
 *     summary: Update a notice by mongoid
 *     tags: [UserNotices]
 *     parameters:
 *       - in: path
 *         name: mongoid
 *         required: true
 *         schema:
 *           type: string
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
router.put('/mongo/:mongoid', controller.updateNoticeByMongoId);

/**
 * @swagger
 * /api/notices/mongo/{mongoid}:
 *   delete:
 *     summary: Delete a notice by mongoid
 *     tags: [UserNotices]
 *     parameters:
 *       - in: path
 *         name: mongoid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notice deleted
 *       404:
 *         description: Notice not found
 */
router.delete('/mongo/:mongoid', controller.deleteNoticeByMongoId);

module.exports = router;
