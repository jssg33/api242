// routes/salesManagerRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/salesManagerController');

/**
 * @swagger
 * components:
 *   schemas:
 *     SalespersonSub:
 *       type: object
 *       properties:
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
 *
 *     SalesManager:
 *       type: object
 *       required:
 *         - fullname
 *         - username
 *       properties:
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
 *         salespersonlist:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SalespersonSub'
 *       example:
 *         fullname: Sarah Thompson
 *         username: sthompson
 *         firstname: Sarah
 *         address1: 123 Main St
 *         city: Charlotte
 *         state: NC
 *         zip: 28202
 *         phone: "555-1234"
 *         region: Southeast
 *         bu: Medical
 *         specialitytype: Oncology
 *         hiredate: 2023-01-01
 *         status: active
 *         defaultbranch: Charlotte HQ
 *         defaultbranchid: 60f7c0b8c2a4f72f9c8e1234
 *         salespersonlist:
 *           - fullname: John Doe
 *             username: jdoe
 *             status: active
 */

/**
 * @swagger
 * /api/salesmanagers:
 *   post:
 *     summary: Create a new sales manager
 *     tags: [SalesManager]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SalesManager'
 *     responses:
 *       201:
 *         description: Sales manager created
 */
router.post('/', controller.createManager);

/**
 * @swagger
 * /api/salesmanagers:
 *   get:
 *     summary: Get all sales managers
 *     tags: [SalesManager]
 *     responses:
 *       200:
 *         description: List of sales managers
 */
router.get('/', controller.getManagers);

/**
 * @swagger
 * /api/salesmanagers/{id}:
 *   get:
 *     summary: Get a sales manager by ID
 *     tags: [SalesManager]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sales manager found
 *       404:
 *         description: Not found
 */
router.get('/:id', controller.getManagerById);

/**
 * @swagger
 * /api/salesmanagers/{id}:
 *   put:
 *     summary: Update a sales manager
 *     tags: [SalesManager]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SalesManager'
 *     responses:
 *       200:
 *         description: Updated successfully
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.updateManager);

/**
 * @swagger
 * /api/salesmanagers/{id}:
 *   delete:
 *     summary: Delete a sales manager
 *     tags: [SalesManager]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 */
router.delete('/:id', controller.deleteManager);

module.exports = router;
