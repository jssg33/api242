const express = require("express");
const router = express.Router();
const controller = require("../controllers/licenseLogController");

/**
 * @swagger
 * tags:
 *   - name: LicenseLogs
 *     description: License log tracking endpoints
 */

/**
 * @swagger
 * /licenselogs:
 *   get:
 *     tags: [LicenseLogs]
 *     summary: Get all license logs
 *     responses:
 *       200:
 *         description: List of license logs
 */
router.get("/", controller.getLicenseLogs);

/**
 * @swagger
 * /licenselogs:
 *   post:
 *     tags: [LicenseLogs]
 *     summary: Create a new license log entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Log created
 */
router.post("/", controller.createLicenseLog);

/**
 * @swagger
 * /licenselogs/user/{userid}:
 *   get:
 *     tags: [LicenseLogs]
 *     summary: Get logs by user ID
 */
router.get("/user/:userid", controller.getLogsByUser);

/**
 * @swagger
 * /licenselogs/group/{groupid}:
 *   get:
 *     tags: [LicenseLogs]
 *     summary: Get logs by group ID
 */
router.get("/group/:groupid", controller.getLogsByGroup);

/**
 * @swagger
 * /licenselogs/company/{companyid}:
 *   get:
 *     tags: [LicenseLogs]
 *     summary: Get logs by company ID
 */
router.get("/company/:companyid", controller.getLogsByCompany);

/**
 * @swagger
 * /licenselogs/manager/{managerid}:
 *   get:
 *     tags: [LicenseLogs]
 *     summary: Get logs by manager ID
 */
router.get("/manager/:managerid", controller.getLogsByManager);

/**
 * @swagger
 * /licenselogs/{id}:
 *   get:
 *     tags: [LicenseLogs]
 *     summary: Get a log by MongoDB _id
 */
router.get("/:id", controller.getLicenseLogById);

/**
 * @swagger
 * /licenselogs/{id}:
 *   put:
 *     tags: [LicenseLogs]
 *     summary: Update a license log by MongoDB _id
 */
router.put("/:id", controller.updateLicenseLog);

/**
 * @swagger
 * /licenselogs/{id}:
 *   delete:
 *     tags: [LicenseLogs]
 *     summary: Delete a license log by MongoDB _id
 */
router.delete("/:id", controller.deleteLicenseLog);


// ------------------------------------------------------
// NEW MONGOID CRUD ROUTES
// ------------------------------------------------------

/**
 * @swagger
 * /licenselogs/mongo/{mongoid}:
 *   get:
 *     tags: [LicenseLogs]
 *     summary: Get all logs by mongoid
 *     parameters:
 *       - in: path
 *         name: mongoid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Logs found
 *       404:
 *         description: No logs found
 */
router.get("/mongo/:mongoid", controller.getLicenseLogsByMongoId);

/**
 * @swagger
 * /licenselogs/mongo/one/{mongoid}:
 *   get:
 *     tags: [LicenseLogs]
 *     summary: Get a single log by mongoid
 */
router.get("/mongo/one/:mongoid", controller.getLicenseLogByMongoId);

/**
 * @swagger
 * /licenselogs/mongo/{mongoid}:
 *   put:
 *     tags: [LicenseLogs]
 *     summary: Update a log by mongoid
 */
router.put("/mongo/:mongoid", controller.updateLicenseLogByMongoId);

/**
 * @swagger
 * /licenselogs/mongo/{mongoid}:
 *   delete:
 *     tags: [LicenseLogs]
 *     summary: Delete a log by mongoid
 */
router.delete("/mongo/:mongoid", controller.deleteLicenseLogByMongoId);


module.exports = router;

