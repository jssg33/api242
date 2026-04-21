const express = require('express');
const router = express.Router();
const controller = require('../controllers/homeResellerController');

/**
 * @swagger
 * tags:
 *   name: HomeReseller
 *   description: API for managing home reseller properties
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         street:
 *           type: string
 *         unit:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         zipCode:
 *           type: string
 *         coordinates:
 *           type: object
 *           properties:
 *             lat:
 *               type: number
 *             lng:
 *               type: number
 *
 *     FloorPlan:
 *       type: object
 *       properties:
 *         bedrooms:
 *           type: number
 *         bathrooms:
 *           type: number
 *         squareFeet:
 *           type: number
 *         layoutDescription:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *
 *     HomeReseller:
 *       type: object
 *       required:
 *         - userid
 *         - resellerName
 *         - contactEmail
 *         - address
 *         - floorPlan
 *         - price
 *       properties:
 *         userid:
 *           type: string
 *         username:
 *           type: string
 *         resellerName:
 *           type: string
 *         contactEmail:
 *           type: string
 *         contactPhone:
 *           type: string
 *         address:
 *           $ref: '#/components/schemas/Address'
 *         floorPlan:
 *           $ref: '#/components/schemas/FloorPlan'
 *         yearBuilt:
 *           type: number
 *         lotSizeSqFt:
 *           type: number
 *         propertyType:
 *           type: string
 *           enum: [single-family, townhome, condo, multi-family]
 *         price:
 *           type: number
 *         status:
 *           type: string
 *           enum: [available, pending, sold]
 *         description:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/homes:
 *   post:
 *     summary: Create a new home reseller property
 *     tags: [HomeReseller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HomeReseller'
 *     responses:
 *       201:
 *         description: Property created successfully
 *       400:
 *         description: Validation error
 */
router.post('/', controller.createProperty);

/**
 * @swagger
 * /api/homes:
 *   get:
 *     summary: Get properties with optional filters
 *     tags: [HomeReseller]
 *     parameters:
 *       - in: query
 *         name: propertyid
 *         schema:
 *           type: string
 *       - in: query
 *         name: userid
 *         schema:
 *           type: string
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *       - in: query
 *         name: resellerName
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of properties
 */
router.get('/', controller.getProperties);

/**
 * @swagger
 * /api/homes/{id}:
 *   get:
 *     summary: Get a single property by ID
 *     tags: [HomeReseller]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property found
 *       404:
 *         description: Property not found
 */
router.get('/:id', controller.getPropertyById);

/**
 * @swagger
 * /api/homes/{id}:
 *   put:
 *     summary: Update a property by ID
 *     tags: [HomeReseller]
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
 *             $ref: '#/components/schemas/HomeReseller'
 *     responses:
 *       200:
 *         description: Property updated
 *       404:
 *         description: Property not found
 */
router.put('/:id', controller.updateProperty);

/**
 * @swagger
 * /api/homes/{id}:
 *   delete:
 *     summary: Delete a property by ID
 *     tags: [HomeReseller]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property deleted
 *       404:
 *         description: Property not found
 */
router.delete('/:id', controller.deleteProperty);

module.exports = router;

