const express = require("express");
const router = express.Router();
const controller = require("../controllers/userLogController");

/**
 * @swagger
 * tags:
 *   name: UserLog
 *   description: User login and activity logs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLog:
 *       type: object
 *       required:
 *         - uid
 *         - username
 *         - description
 *       properties:
 *         uid:
 *           type: number
 *         username:
 *           type: string
 *         hashid:
 *           type: number
 *         mongoid:
 *           type: string
 *         location:
 *           type: string
 *         loginstatus:
 *           type: string
 *         ipaddress:
 *           type: string
 *         description:
 *           type: string
 *         uiorigin:
 *           type: string
 *         instance:
 *           type: string
 *         region:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

/**
 * @swagger
 * /api/userlog:
 *   post:
 *     summary: Create a new user log entry
 *     tags: [UserLog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLog'
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", controller.createLog);

/**
 * @swagger
 * /api/userlog/id/{id}:
 *   get:
 *     summary: Get a user log by Mongo _id
 *     tags: [UserLog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User log found
 */
router.get("/id/:id", controller.getById);

/**
 * @swagger
 * /api/userlog/uid/{uid}:
 *   get:
 *     summary: Get user logs by UID
 *     tags: [UserLog]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of logs
 */
router.get("/uid/:uid", controller.getByUid);

/**
 * @swagger
 * /api/userlog/mongoid/{mongoid}:
 *   get:
 *     summary: Get user logs by mongoid field
 *     tags: [UserLog]
 *     parameters:
 *       - in: path
 *         name: mongoid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of logs
 */
router.get("/mongoid/:mongoid", controller.getByMongoId);

/**
 * @swagger
 * /api/userlog/id/{id}:
 *   put:
 *     summary: Update a user log by Mongo _id
 *     tags: [UserLog]
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
 *             $ref: '#/components/schemas/UserLog'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put("/id/:id", controller.updateById);

/**
 * @swagger
 * /api/userlog/uid/{uid}:
 *   put:
 *     summary: Update a user log by UID
 *     tags: [UserLog]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLog'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put("/uid/:uid", controller.updateByUid);

/**
 * @swagger
 * /api/userlog/mongoid/{mongoid}:
 *   put:
 *     summary: Update a user log by mongoid field
 *     tags: [UserLog]
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
 *             $ref: '#/components/schemas/UserLog'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put("/mongoid/:mongoid", controller.updateByMongoId);

module.exports = router;

