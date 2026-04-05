// routes/analystRoutes.js

const express = require('express');
const router = express.Router();
const AnalystController = require('../controllers/AnalystController');

/**
 * @swagger
 * tags:
 *   name: Analysts
 *   description: Analyst management endpoints
 */

/**
 * @swagger
 * /api/analysts:
 *   get:
 *     summary: Get all analysts
 *     tags: [Analysts]
 */
router.get('/', AnalystController.getAll);

/**
 * @swagger
 * /api/analysts/{id}:
 *   get:
 *     summary: Get analyst by ID
 *     tags: [Analysts]
 */
router.get('/:id', AnalystController.getOne);

/**
 * @swagger
 * /api/analysts/user/{userId}:
 *   get:
 *     summary: Get analysts by userId
 *     tags: [Analysts]
 */
router.get('/user/:userId', AnalystController.getByUser);

/**
 * @swagger
 * /api/analysts/region/{region}:
 *   get:
 *     summary: Get analysts by region
 *     tags: [Analysts]
 */
router.get('/region/:region', AnalystController.getByRegion);

/**
 * @swagger
 * /api/analysts:
 *   post:
 *     summary: Create a new analyst
 *     tags: [Analysts]
 */
router.post('/', AnalystController.create);

/**
 * @swagger
 * /api/analysts/{id}:
 *   put:
 *     summary: Update an analyst
 *     tags: [Analysts]
 */
router.put('/:id', AnalystController.update);

/**
 * @swagger
 * /api/analysts/{id}:
 *   delete:
 *     summary: Delete an analyst
 *     tags: [Analysts]
 */
router.delete('/:id', AnalystController.remove);

module.exports = router;
