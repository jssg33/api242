// routes/qualityManagerRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/qualityManagerController');

/**
 * @swagger
 * tags:
 *   name: QualityManagers
 *   description: Quality Manager management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     QualityManager:
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
 *         defaultbranch:
 *           type: string
 *         defaultbranchid:
 *           type: string
 *         analystlist:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QualityAnalyst'
 */

/**
 * @swagger
 * /api/qualitymanagers:
 *   get:
 *     summary: Get all quality managers
 *     tags: [QualityManagers]
 */
router.get('/', controller.getAllQualityManagers);

/**
 * @swagger
 * /api/qualitymanagers/{id}:
 *   get:
 *     summary: Get a quality manager by ID
 *     tags: [QualityManagers]
 */
router.get('/:id', controller.getQualityManagerById);

/**
 * @swagger
 * /api/qualitymanagers:
 *   post:
 *     summary: Create a new quality manager
 *     tags: [QualityManagers]
 */
router.post('/', controller.createQualityManager);

/**
 * @swagger
 * /api/qualitymanagers/{id}:
 *   put:
 *     summary: Update a quality manager
 *     tags: [QualityManagers]
 */
router.put('/:id', controller.updateQualityManager);

/**
 * @swagger
 * /api/qualitymanagers/{id}:
 *   delete:
 *     summary: Delete a quality manager
 *     tags: [QualityManagers]
 */
router.delete('/:id', controller.deleteQualityManager);

module.exports = router;
