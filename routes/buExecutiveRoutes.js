// routes/buExecutiveRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/buExecutiveController');

/**
 * @swagger
 * tags:
 *   name: BUExecutives
 *   description: Business Unit Executives (Band hierarchy)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BUExecutive:
 *       type: object
 *       required:
 *         - fullname
 *         - username
 *         - title
 *         - band
 *         - buid
 *         - buname
 *         - orgunitid
 *         - orgunitname
 *       properties:
 *         id:
 *           type: string
 *         fullname:
 *           type: string
 *         username:
 *           type: string
 *         title:
 *           type: string
 *           enum:
 *             - President
 *             - VicePresident
 *             - ExecutiveVicePresident
 *             - Partner
 *             - ManagingPartner
 *             - Other
 *         band:
 *           type: number
 *         buid:
 *           type: string
 *         buname:
 *           type: string
 *         orgunitid:
 *           type: string
 *         orgunitname:
 *           type: string
 *         directreports:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               refModel:
 *                 type: string
 *               refId:
 *                 type: string
 */

router.get('/', controller.getAllBUExecutives);
router.get('/:id', controller.getBUExecutiveById);
router.post('/', controller.createBUExecutive);
router.put('/:id', controller.updateBUExecutive);
router.delete('/:id', controller.deleteBUExecutive);

module.exports = router;
