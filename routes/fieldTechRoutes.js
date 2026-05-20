// routes/fieldTechRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/fieldTechController');

/**
 * @swagger
 * tags:
 *   name: FieldTechs
 *   description: Field Technician management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FieldTech:
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

router.get('/', controller.getAllFieldTechs);
router.get('/:id', controller.getFieldTechById);
router.post('/', controller.createFieldTech);
router.put('/:id', controller.updateFieldTech);
router.delete('/:id', controller.deleteFieldTech);

module.exports = router;
