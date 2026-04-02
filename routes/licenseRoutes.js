const express = require("express");
const router = express.Router();
const licenseController = require("../controllers/licenseController");

/**
 * @swagger
 * components:
 *   schemas:
 *     License:
 *       type: object
 *       required:
 *         - licenseid
 *         - version
 *         - installdate
 *         - enddate
 *         - customerid
 *         - productid
 *         - description
 *         - releaseyear
 *       properties:
 *         id:
 *           type: string
 *         licenseid:
 *           type: string
 *           example: "LIC-001"
 *         version:
 *           type: string
 *           example: "1.0.0"
 *         installdate:
 *           type: string
 *           example: "2024-01-01"
 *         enddate:
 *           type: string
 *           example: "2025-01-01"
 *         customerid:
 *           type: string
 *           example: "CUST-123"
 *         productid:
 *           type: string
 *           example: "PROD-456"
 *         description:
 *           type: string
 *           example: "Enterprise license for Product X"
 *         releaseyear:
 *           type: string
 *           example: "2024"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   - name: Licenses
 *     description: License management endpoints
 */

/**
 * @swagger
 * /licenses:
 *   get:
 *     tags: [Licenses]
 *     summary: Get all licenses
 *     responses:
 *       200:
 *         description: List of licenses
 */
router.get("/", licenseController.getLicenses);

/**
 * @swagger
 * /licenses:
 *   post:
 *     tags: [Licenses]
 *     summary: Create a new license
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/License'
 *     responses:
 *       201:
 *         description: License created
 */
router.post("/", licenseController.createLicense);

/**
 * @swagger
 * /licenses/user/{userid}:
 *   get:
 *     tags: [Licenses]
 *     summary: Get licenses by user ID
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of licenses for the user
 */
router.get("/user/:userid", licenseController.getLicensesByUser);

/**
 * @swagger
 * /licenses/customer/{customerid}:
 *   get:
 *     tags: [Licenses]
 *     summary: Get licenses by customer ID
 *     parameters:
 *       - in: path
 *         name: customerid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of licenses for the customer
 */
router.get("/customer/:customerid", licenseController.getLicensesByCustomer);

/**
 * @swagger
 * /licenses/group/{groupid}:
 *   get:
 *     tags: [Licenses]
 *     summary: Get licenses by group ID
 *     parameters:
 *       - in: path
 *         name: groupid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of licenses for the group
 */
router.get("/group/:groupid", licenseController.getLicensesByGroup);

/**
 * @swagger
 * /licenses/{id}:
 *   get:
 *     tags: [Licenses]
 *     summary: Get a license by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: License found
 *       404:
 *         description: License not found
 */
router.get("/:id", licenseController.getLicenseById);

/**
 * @swagger
 * /licenses/{id}:
 *   put:
 *     tags: [Licenses]
 *     summary: Update a license
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
 *             $ref: '#/components/schemas/License'
 *     responses:
 *       200:
 *         description: License updated
 *       404:
 *         description: License not found
 */
router.put("/:id", licenseController.updateLicense);

/**
 * @swagger
 * /licenses/{id}:
 *   delete:
 *     tags: [Licenses]
 *     summary: Delete a license
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: License deleted
 *       404:
 *         description: License not found
 */
router.delete("/:id", licenseController.deleteLicense);

module.exports = router;
