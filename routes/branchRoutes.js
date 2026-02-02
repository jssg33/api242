const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchController");

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - companyId
 *         - compId
 *         - name
 *         - address1
 *         - city
 *         - state
 *         - zip
 *         - country
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId
 *         companyId:
 *           type: string
 *           description: MongoDB ObjectId reference to Company
 *         compId:
 *           type: string
 *           description: Business identifier for the branch (string)
 *         name:
 *           type: string
 *           description: Branch name
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
 *         country:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: "67a1b2c3d4e5f6a7b8c9d0e1"
 *         companyId: "66f1a2b3c4d5e6f7a8b9c0d1"
 *         compId: "VZFED001"
 *         name: "East Coast Branch"
 *         address1: "123 Main St"
 *         address2: "Suite 200"
 *         city: "Charlotte"
 *         state: "NC"
 *         zip: "28202"
 *         country: "USA"
 *         phone: "803-867-5309"
 *         email: "branch@example.com"
 *         createdAt: "2025-01-30T12:34:56.000Z"
 */

/**
 * @openapi
 * /branches:
 *   get:
 *     summary: Get all branches
 *     tags:
 *       - Branches
 *     responses:
 *       200:
 *         description: List of branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 */
router.get("/", branchController.getAllBranches);

/**
 * @openapi
 * /branches/{id}:
 *   get:
 *     summary: Get a branch by ID
 *     tags:
 *       - Branches
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch ID
 *     responses:
 *       200:
 *         description: Branch found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       404:
 *         description: Branch not found
 */
router.get("/:id", branchController.getBranchById);

/**
 * @openapi
 * /branches:
 *   post:
 *     summary: Create a new branch
 *     tags:
 *       - Branches
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       201:
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Invalid input
 */
router.post("/", branchController.createBranch);

/**
 * @openapi
 * /branches/{id}:
 *   put:
 *     summary: Update a branch
 *     tags:
 *       - Branches
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       200:
 *         description: Branch updated
 *       404:
 *         description: Branch not found
 */
router.put("/:id", branchController.updateBranch);

/**
 * @openapi
 * /branches/{id}:
 *   delete:
 *     summary: Delete a branch
 *     tags:
 *       - Branches
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Branch ID
 *     responses:
 *       200:
 *         description: Branch deleted
 *       404:
 *         description: Branch not found
 */
router.delete("/:id", branchController.deleteBranch);

module.exports = router;
