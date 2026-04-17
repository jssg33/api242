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
 *         version:
 *           type: string
 *         installdate:
 *           type: string
 *         enddate:
 *           type: string
 *         customerid:
 *           type: string
 *         userid:
 *           type: string
 *         groupid:
 *           type: string
 *         mongoid:
 *           type: string
 *         productid:
 *           type: string
 *         description:
 *           type: string
 *         releaseyear:
 *           type: string
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
 */
router.get("/user/:userid", licenseController.getLicensesByUser);

/**
 * @swagger
 * /licenses/customer/{customerid}:
 *   get:
 *     tags: [Licenses]
 *     summary: Get licenses by customer ID
 */
router.get("/customer/:customerid", licenseController.getLicensesByCustomer);

/**
 * @swagger
 * /licenses/group/{groupid}:
 *   get:
 *     tags: [Licenses]
 *     summary: Get licenses by group ID
 */
router.get("/group/:groupid", licenseController.getLicensesByGroup);

/**
 * @swagger
 * /licenses/{id}:
 *   get:
 *     tags: [Licenses]
 *     summary: Get a license by MongoDB _id
 */
router.get("/:id", licenseController.getLicenseById);

/**
 * @swagger
 * /licenses/{id}:
 *   put:
 *     tags: [Licenses]
 *     summary: Update a license by MongoDB _id
 */
router.put("/:id", licenseController.updateLicense);

/**
 * @swagger
 * /licenses/{id}:
 *   delete:
 *     tags: [Licenses]
 *     summary: Delete a license by MongoDB _id
 */
router.delete("/:id", licenseController.deleteLicense);


// -----------------------------------------------------
// NEW MONGOID-BASED ROUTES
// -----------------------------------------------------

/**
 * @swagger
 * /licenses/mongo/{mongoid}:
 *   get:
 *     tags: [Licenses]
 *     summary: Get all licenses by mongoid
 *     parameters:
 *       - in: path
 *         name: mongoid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Licenses found
 *       404:
 *         description: No licenses found
 */
router.get("/mongo/:mongoid", licenseController.getLicensesByMongoId);

/**
 * @swagger
 * /licenses/mongo/one/{mongoid}:
 *   get:
 *     tags: [Licenses]
 *     summary: Get a single license by mongoid
 */
router.get("/mongo/one/:mongoid", licenseController.getLicenseByMongoId);

/**
 * @swagger
 * /licenses/mongo/{mongoid}:
 *   put:
 *     tags: [Licenses]
 *     summary: Update a license by mongoid
 */
router.put("/mongo/:mongoid", licenseController.updateLicenseByMongoId);

/**
 * @swagger
 * /licenses/mongo/{mongoid}:
 *   delete:
 *     tags: [Licenses]
 *     summary: Delete a license by mongoid
 */
router.delete("/mongo/:mongoid", licenseController.deleteLicenseByMongoId);


module.exports = router;
