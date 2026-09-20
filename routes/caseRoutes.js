const express = require("express");
const router = express.Router();

const {
  createCase,
  getCases,
  getCaseById,
  getCaseByNumber,
  updateCase,
  deleteCase,
  approveCase,
  rejectCase,
} = require("../controllers/caseController");

/**
 * @swagger
 * tags:
 *   name: Cases
 *   description: Investigative Case Management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Case:
 *       type: object
 *       required:
 *         - casenumber
 *         - userid
 *         - companyid
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB ObjectId
 *         casenumber:
 *           type: string
 *           example: 25-001234
 *         casetype:
 *           type: string
 *           example: criminal
 *         userid:
 *           type: string
 *           example: john.smith@agency.gov
 *         managerid:
 *           type: string
 *           example: sgt.jones@agency.gov
 *         srmanagerid:
 *           type: string
 *           example: captain.brown@agency.gov
 *         companyid:
 *           type: string
 *           example: GPD001
 *         status:
 *           type: string
 *           enum:
 *             - open
 *             - under_investigation
 *             - closed
 *             - referred_to_da
 *         offensetype:
 *           type: string
 *           example: Burglary
 *         incidentdate:
 *           type: string
 *           format: date-time
 *         reportdate:
 *           type: string
 *           format: date-time
 *         location:
 *           type: string
 *           example: 123 Main Street, Greenville SC
 *         latitude:
 *           type: number
 *           example: 34.8526
 *         longitude:
 *           type: number
 *           example: -82.3940
 *         vmsurl:
 *           type: string
 *           description: Link to Video Management System repository
 *           example: https://vms.agency.gov/cases/25-001234
 *         azurebloburl:
 *           type: string
 *           description: Direct Azure Blob URL when evidence is stored outside VMS
 *           example: https://storageaccount.blob.core.windows.net/evidence/bodycam.mp4
 *         approvalstatus:
 *           type: string
 *           enum:
 *             - pending
 *             - approved
 *             - rejected
 *         approvedat:
 *           type: string
 *           format: date-time
 *         srapprovedat:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/cases:
 *   post:
 *     summary: Create a new case
 *     tags: [Cases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Case'
 *     responses:
 *       201:
 *         description: Case created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", createCase);

/**
 * @swagger
 * /api/cases:
 *   get:
 *     summary: Get all cases
 *     tags: [Cases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: companyid
 *         schema:
 *           type: string
 *       - in: query
 *         name: userid
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of cases
 */
router.get("/", getCases);

/**
 * @swagger
 * /api/cases/number/{casenumber}:
 *   get:
 *     summary: Get case by case number
 *     tags: [Cases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: casenumber
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Case found
 *       404:
 *         description: Case not found
 */
router.get("/number/:casenumber", getCaseByNumber);

/**
 * @swagger
 * /api/cases/{id}:
 *   get:
 *     summary: Get case by MongoDB ID
 *     tags: [Cases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Case found
 *       404:
 *         description: Case not found
 */
router.get("/:id", getCaseById);

/**
 * @swagger
 * /api/cases/{id}:
 *   put:
 *     summary: Update an existing case
 *     tags: [Cases]
 *     security:
 *       - bearerAuth: []
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
 *             $ref: '#/components/schemas/Case'
 *     responses:
 *       200:
 *         description: Case updated
 *       404:
 *         description: Case not found
 */
router.put("/:id", updateCase);

/**
 * @swagger
 * /api/cases/{id}:
 *   delete:
 *     summary: Delete a case
 *     tags: [Cases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Case deleted
 *       404:
 *         description: Case not found
 */
router.delete("/:id", deleteCase);

/**
 * @swagger
 * /api/cases/{id}/approve:
 *   put:
 *     summary: Approve a case
 *     tags: [Cases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Case approved
 *       404:
 *         description: Case not found
 */
router.put("/:id/approve", approveCase);

/**
 * @swagger
 * /api/cases/{id}/reject:
 *   put:
 *     summary: Reject a case
 *     tags: [Cases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Case rejected
 *       404:
 *         description: Case not found
 */
router.put("/:id/reject", rejectCase);

module.exports = router;
