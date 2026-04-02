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
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Logs for the user
 */
router.get("/user/:userid", controller.getLogsByUser);

/**
 * @swagger
 * /licenselogs/group/{groupid}:
 *   get:
 *     tags: [LicenseLogs]
 *     summary: Get logs by group ID
 *     parameters:
 *       - in: path
 *         name: groupid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Logs for the group
 */
router.get("/group/:groupid", controller.getLogsByGroup);

/**
 * @swagger
 * /licenselogs/company/{companyid}:
 *   get:
 *     tags: [LicenseLogs]
 *     summary: Get logs by company ID
 *     parameters:
 *       - in: path
 *         name: companyid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Logs for the company
 */
router.get("/company/:companyid", controller.getLogsByCompany);

/**
 * @swagger
 * /licenselogs/manager/{managerid}:
 *   get:
 *     tags: [LicenseLogs]
 *     summary: Get logs by manager ID
 *     parameters:
 *       - in: path
 *         name: managerid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Logs for the manager
 */
router.get("/manager/:managerid", controller.getLogsByManager);

/**
 * @swagger
 * /licenselogs/{id}:
 *   get:
 *     tags: [LicenseLogs]
 *     summary: Get a log by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Log found
 *       404:
 *         description: Log not found
 */
router.get("/:id", controller.getLicenseLogById);

/**
 * @swagger
 * /licenselogs/{id}:
 *   put:
 *     tags: [LicenseLogs]
 *     summary: Update a license log
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
 *             type: object
 *     responses:
 *       200:
 *         description: Log updated
 *       404:
 *         description: Log not found
 */
router.put("/:id", controller.updateLicenseLog);

/**
 * @swagger
 * /licenselogs/{id}:
 *   delete:
 *     tags: [LicenseLogs]
 *     summary: Delete a license log
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Log deleted
 *       404:
 *         description: Log not found
 */
router.delete("/:id", controller.deleteLicenseLog);

module.exports = router;

