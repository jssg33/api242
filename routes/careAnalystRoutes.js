// routes/careAnalystRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/careAnalystController');

/**
 * @swagger
 * tags:
 *   name: CareAnalysts
 *   description: Customer Care Analyst management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CareAnalyst:
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

router.get('/', controller.getAllCareAnalysts);
router.get('/:id', controller.getCareAnalystById);
router.post('/', controller.createCareAnalyst);
router.put('/:id', controller.updateCareAnalyst);
router.delete('/:id', controller.deleteCareAnalyst);

module.exports = router;
