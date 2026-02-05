const express = require('express');
const router = express.Router();
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
 */

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Get all API logs
 *     tags: [ApiLog]
 */
router.get('/', controller.getAllLogs);

/**
 * @swagger
 * /api/logs/{id}:
 *   get:
 *     summary: Get a log by ID
 *     tags: [ApiLog]
 */
router.get('/:id', controller.getLogById);

/**
 * @swagger
 * /api/logs:
 *   post:
 *     summary: Create a new API log
 *     tags: [ApiLog]
 */
router.post('/', controller.createLog);

module.exports = router;
