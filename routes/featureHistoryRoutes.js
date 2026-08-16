const express = require('express');
const router = express.Router();
const controller = require('../controllers/featureHistoryController');

/**
 * @swagger
 * components:
 *   schemas:
 *     FeatureHistory:
 *       type: object
 *       required:
 *         - userId
 *         - featureId
 *         - featureName
 *       properties:
 *         _id:
 *           type: string
 *         userId:
 *           type: string
 *           description: Mongo user ID
 *         featureId:
 *           type: string
 *           description: Unique feature identifier
 *         featureName:
 *           type: string
 *           description: Friendly name for charts
 *         useCount:
 *           type: number
 *         lastUsed:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/featurehistory:
 *   post:
 *     summary: Create or increment a feature usage record
 *     tags: [FeatureHistory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeatureHistory'
 *     responses:
 *       201:
 *         description: Created or updated
 */
router.post('/', controller.createOrIncrement);

/**
 * @swagger
 * /api/featurehistory:
 *   get:
 *     summary: Get all feature history records
 *     tags: [FeatureHistory]
 *     responses:
 *       200:
 *         description: List of feature usage records
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/featurehistory/user/{userId}:
 *   get:
 *     summary: Get all feature history records for a specific user
 *     tags: [FeatureHistory]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User feature history list
 */
router.get('/user/:userId', controller.getByUser);

/**
 * @swagger
 * /api/featurehistory/{id}:
 *   get:
 *     summary: Get a single feature history record by ID
 *     tags: [FeatureHistory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Single feature history record
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /api/featurehistory/{id}:
 *   delete:
 *     summary: Delete a feature history record by ID
 *     tags: [FeatureHistory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete('/:id', controller.deleteById);

/**
 * @swagger
 * /api/featurehistory/user/{userId}:
 *   delete:
 *     summary: Delete all feature history records for a specific user
 *     tags: [FeatureHistory]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: All user feature history deleted
 */
router.delete('/user/:userId', controller.deleteByUser);

module.exports = router;
