// routes/fieldTechManagerRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/fieldTechManagerController');

/**
 * @swagger
 * tags:
 *   name: FieldTechManagers
 *   description: Field Technician Manager management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FieldTechManager:
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
 *         techlist:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FieldTech'
 */

router.get('/', controller.getAllFieldTechManagers);
router.get('/:id', controller.getFieldTechManagerById);
router.post('/', controller.createFieldTechManager);
router.put('/:id', controller.updateFieldTechManager);
router.delete('/:id', controller.deleteFieldTechManager);

module.exports = router;
