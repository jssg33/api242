const express = require('express');
const router = express.Router();
const { numberParam } = require("../middleware/validateParams");
router.param("id", numberParam);
const controller = require('../controllers/apiLogController');

/**
 * @swagger
 * components:
 *   schemas:
 *     ApiLog:
 *       type: object
 *       required:
 *         - id
 *         - apiname
 *         - apinumber
 *         - eptype
 *         - hashid
 *       properties:
 *         id:
 *           type: integer
 *         apiname:
 *           type: string
 *         apinumber:
 *           type: string
 *         eptype:
 *           type: string
 *         hashid:
 *           type: integer
 *         parameterlist:
 *           type: string
 *         apiresult:
 *           type: string
 *         description:
 *           type: string
 *         InsertDate:
 *           type: string
 *           format: date-time
 *           description: Set once when the record is created
 *         LastUpdateDate:
 *           type: string
 *           format: date-time
 *           description: Refreshed on every update
 *         SoftDeleteDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Null until the record is soft-deleted
 */

/**
 * @swagger
 * /api/apilogs:
 *   get:
 *     summary: Get all API logs
 *     tags: [ApiLog]
 */
router.get('/', controller.getAllLogs);

/**
 * @swagger
 * /api/apilogs/{id}:
 *   get:
 *     summary: Get a log by ID
 *     tags: [ApiLog]
 */
router.get('/:id', controller.getLogById);

/**
 * @swagger
 * /api/apilogs:
 *   post:
 *     summary: Create a new API log
 *     tags: [ApiLog]
 */
router.post('/', controller.createLog);

module.exports = router;
