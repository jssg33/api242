// routes/careManagerRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/careManagerController');

/**
 * @swagger
 * tags:
 *   name: CareManagers
 *   description: Customer Care Manager management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CareManager:
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
 *             $ref: '#/components/schemas/CareAnalyst'
 */

router.get('/', controller.getAllCareManagers);
router.get('/:id', controller.getCareManagerById);
router.post('/', controller.createCareManager);
router.put('/:id', controller.updateCareManager);
router.delete('/:id', controller.deleteCareManager);

module.exports = router;
