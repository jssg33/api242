// routes/qualityAnalystRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/qualityAnalystController');

/**
 * @swagger
 * tags:
 *   name: QualityAnalysts
 *   description: Quality Analyst management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     QualityAnalyst:
 *       type: object
 *       required:
 *         - fullname
 *         - username
 *       properties:
 *         id:
 *           type: string
 *         fullname:
 *           type: string
 *         username:
 *           type: string
 *         firstname:
 *           type: string
 *         address1:
 *           type: string
 *         address2:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         zip:
 *           type: string
 *         phone:
 *           type: string
 *         cell:
 *           type: string
 *         btn:
 *           type: string
 *         managerid:
 *           type: string
 *         region:
 *           type: string
 *         bu:
 *           type: string
 *         specialitytype:
 *           type: string
 *         hiredate:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [active, suspended, terminated, leave]
 */

/**
 * @swagger
 * /api/qualityanalysts:
 *   get:
 *     summary: Get all quality analysts
 *     tags: [QualityAnalysts]
 */
router.get('/', controller.getAllQualityAnalysts);

/**
 * @swagger
 * /api/qualityanalysts/{id}:
 *   get:
 *     summary: Get a quality analyst by ID
 *     tags: [QualityAnalysts]
 */
router.get('/:id', controller.getQualityAnalystById);

/**
 * @swagger
 * /api/qualityanalysts:
 *   post:
 *     summary: Create a new quality analyst
 *     tags: [QualityAnalysts]
 */
router.post('/', controller.createQualityAnalyst);

/**
 * @swagger
 * /api/qualityanalysts/{id}:
 *   put:
 *     summary: Update a quality analyst
 *     tags: [QualityAnalysts]
 */
router.put('/:id', controller.updateQualityAnalyst);

/**
 * @swagger
 * /api/qualityanalysts/{id}:
 *   delete:
 *     summary: Delete a quality analyst
 *     tags: [QualityAnalysts]
 */
router.delete('/:id', controller.deleteQualityAnalyst);

module.exports = router;
