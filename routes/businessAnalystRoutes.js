// routes/businessAnalystRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/businessAnalystController');

/**
 * @swagger
 * tags:
 *   name: BusinessAnalysts
 *   description: Business Analyst management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BusinessAnalyst:
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

router.get('/', controller.getAllBusinessAnalysts);
router.get('/:id', controller.getBusinessAnalystById);
router.post('/', controller.createBusinessAnalyst);
router.put('/:id', controller.updateBusinessAnalyst);
router.delete('/:id', controller.deleteBusinessAnalyst);

module.exports = router;
