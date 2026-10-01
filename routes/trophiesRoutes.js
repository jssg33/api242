const express = require("express");
const router = express.Router();
const trophiesController = require("../controllers/trophiesController");

/**
 * @openapi
 * components:
 *   schemas:
 *     TrophyItem:
 *       type: object
 *       required:
 *         - id
 *         - title
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         competition:
 *           type: string
 *         year:
 *           type: string
 *         placement:
 *           type: string
 *         description:
 *           type: string
 *         imageUrl:
 *           type: string
 *     Trophies:
 *       type: object
 *       required:
 *         - installationId
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId
 *         installationId:
 *           type: string
 *           description: Ties this record to installationdefault.conf's installationId
 *         name:
 *           type: string
 *         subtitle:
 *           type: string
 *         position:
 *           type: string
 *         address1:
 *           type: string
 *         address2:
 *           type: string
 *         description:
 *           type: string
 *         trophies:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TrophyItem'
 *         updatedBy:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: "67a1b2c3d4e5f6a7b8c9d0e1"
 *         installationId: "usc242"
 *         name: "John S. Stritzinger"
 *         subtitle: "Global Tech Executive"
 *         position: "Graduate Assistant - University of South Carolina"
 *         address1: "1800 Washington Street"
 *         address2: "Columbia, South Carolina 29201"
 *         description: "A collection of competitive achievements and trophies..."
 *         trophies:
 *           - id: "1"
 *             title: "First Place - Tech Innovation Challenge"
 *             competition: "National Technology Conference"
 *             year: "2024"
 *             placement: "1st Place"
 *             description: "Won first place for innovative enterprise architecture solution"
 *             imageUrl: ""
 *         updatedBy: "john"
 */

/**
 * @openapi
 * /trophies:
 *   get:
 *     summary: Get all trophies records
 *     tags:
 *       - Trophies
 *     responses:
 *       200:
 *         description: List of trophies records (client filters by installationId)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trophies'
 */
router.get("/", trophiesController.getAllTrophies);

/**
 * @openapi
 * /trophies/{id}:
 *   get:
 *     summary: Get a trophies record by ID
 *     tags:
 *       - Trophies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trophies record ID
 *     responses:
 *       200:
 *         description: Trophies record found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trophies'
 *       404:
 *         description: Trophies record not found
 */
router.get("/:id", trophiesController.getTrophiesById);

/**
 * @openapi
 * /trophies:
 *   post:
 *     summary: Create a new trophies record
 *     tags:
 *       - Trophies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trophies'
 *     responses:
 *       201:
 *         description: Trophies record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trophies'
 *       400:
 *         description: Invalid input
 */
router.post("/", trophiesController.createTrophies);

/**
 * @openapi
 * /trophies/{id}:
 *   put:
 *     summary: Update a trophies record
 *     tags:
 *       - Trophies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trophies record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trophies'
 *     responses:
 *       200:
 *         description: Trophies record updated
 *       404:
 *         description: Trophies record not found
 */
router.put("/:id", trophiesController.updateTrophies);

/**
 * @openapi
 * /trophies/{id}:
 *   delete:
 *     summary: Delete a trophies record
 *     tags:
 *       - Trophies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trophies record ID
 *     responses:
 *       200:
 *         description: Trophies record deleted
 *       404:
 *         description: Trophies record not found
 */
router.delete("/:id", trophiesController.deleteTrophies);

module.exports = router;
