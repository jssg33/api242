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
 * /api/analysts/analystId/{analystId}:
 *   get:
 *     summary: Get analyst by analystId (business ID)
 *     tags: [Analysts]
 */
router.get('/analystId/:analystId', AnalystController.getByAnalystId);

/**
 * @swagger
 * /api/analysts/{id}:
 *   get:
 *     summary: Get analyst by MongoDB _id
 *     tags: [Analysts]
 */
router.get('/:id', AnalystController.getOne);

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
