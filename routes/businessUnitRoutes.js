const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../middleware/validateParams");
router.param("id", objectIdParam);
const controller = require("../controllers/businessUnitController");

/**
 * @openapi
 * tags:
 *   name: BusinessUnits
 *   description: Business Units inside Organization Units
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     BusinessUnit:
 *       type: object
 *       required:
 *         - buid
 *         - buname
 *         - orgunitid
 *         - companyid
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB ObjectId
 *         buid:
 *           type: string
 *           description: Unique business unit identifier
 *         buname:
 *           type: string
 *           description: Business unit name
 *         orgunitid:
 *           type: string
 *           description: Reference to OrganizationUnit
 *         companyid:
 *           type: string
 *           description: Reference to Company
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         InsertDate:
 *           type: string
 *           format: date-time
 *           description: Set once when the record is created
 *         LastUpdateDate:
 *           type: string
 *           format: date-time
 *           description: Refreshed on every update
 *         SoftDeleteDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Null until the record is soft-deleted
 */

/**
 * @openapi
 * /api/businessunits:
 *   get:
 *     tags: [BusinessUnits]
 *     summary: Get all business units
 *     responses:
 *       200:
 *         description: List of business units
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BusinessUnit'
 */
router.get("/", controller.getAllBusinessUnits);

/**
 * @openapi
 * /api/businessunits/{id}:
 *   get:
 *     tags: [BusinessUnits]
 *     summary: Get a business unit by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Business Unit ID
 *     responses:
 *       200:
 *         description: Business unit found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessUnit'
 *       404:
 *         description: Business unit not found
 */
router.get("/:id", controller.getBusinessUnitById);

/**
 * @openapi
 * /api/businessunits:
 *   post:
 *     tags: [BusinessUnits]
 *     summary: Create a new business unit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessUnit'
 *     responses:
 *       201:
 *         description: Business unit created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessUnit'
 *       400:
 *         description: Validation error
 */
router.post("/", controller.createBusinessUnit);

/**
 * @openapi
 * /api/businessunits/{id}:
 *   put:
 *     tags: [BusinessUnits]
 *     summary: Update a business unit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Business Unit ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessUnit'
 *     responses:
 *       200:
 *         description: Business unit updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessUnit'
 *       404:
 *         description: Business unit not found
 *       400:
 *         description: Validation error
 */
router.put("/:id", controller.updateBusinessUnit);

/**
 * @openapi
 * /api/businessunits/{id}:
 *   delete:
 *     tags: [BusinessUnits]
 *     summary: Delete a business unit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Business Unit ID
 *     responses:
 *       200:
 *         description: Business unit deleted
 *       404:
 *         description: Business unit not found
 */
router.delete("/:id", controller.deleteBusinessUnit);

module.exports = router;
