const express = require("express");
const router = express.Router();
const controller = require("../controllers/organizationUnitController");

/**
 * @openapi
 * tags:
 *   name: OrganizationUnits
 *   description: Company Organization Units
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     OrganizationUnit:
 *       type: object
 *       required:
 *         - ouid
 *         - ouname
 *         - companyid
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB ObjectId
 *         ouid:
 *           type: string
 *           description: Unique identifier for the organization unit
 *         ouname:
 *           type: string
 *           description: Name of the organization unit
 *         companyid:
 *           type: string
 *           description: Reference to the parent company
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

/**
 * @openapi
 * /organization-units:
 *   get:
 *     tags: [OrganizationUnits]
 *     summary: Get all organization units
 *     responses:
 *       200:
 *         description: List of organization units
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrganizationUnit'
 */
router.get("/", controller.getAllOrganizationUnits);

/**
 * @openapi
 * /organization-units/{id}:
 *   get:
 *     tags: [OrganizationUnits]
 *     summary: Get an organization unit by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization Unit ID
 *     responses:
 *       200:
 *         description: Organization unit found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrganizationUnit'
 *       404:
 *         description: Organization unit not found
 */
router.get("/:id", controller.getOrganizationUnitById);

/**
 * @openapi
 * /organization-units:
 *   post:
 *     tags: [OrganizationUnits]
 *     summary: Create a new organization unit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrganizationUnit'
 *     responses:
 *       201:
 *         description: Organization unit created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrganizationUnit'
 *       400:
 *         description: Validation error
 */
router.post("/", controller.createOrganizationUnit);

/**
 * @openapi
 * /organization-units/{id}:
 *   put:
 *     tags: [OrganizationUnits]
 *     summary: Update an organization unit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization Unit ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrganizationUnit'
 *     responses:
 *       200:
 *         description: Organization unit updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrganizationUnit'
 *       404:
 *         description: Organization unit not found
 *       400:
 *         description: Validation error
 */
router.put("/:id", controller.updateOrganizationUnit);

/**
 * @openapi
 * /organization-units/{id}:
 *   delete:
 *     tags: [OrganizationUnits]
 *     summary: Delete an organization unit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Organization Unit ID
 *     responses:
 *       200:
 *         description: Organization unit deleted
 *       404:
 *         description: Organization unit not found
 */
router.delete("/:id", controller.deleteOrganizationUnit);

module.exports = router;
