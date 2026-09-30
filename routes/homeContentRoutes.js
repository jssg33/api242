const express = require("express");
const router = express.Router();
const homeContentController = require("../controllers/homeContentController");

/**
 * @openapi
 * components:
 *   schemas:
 *     TileOverride:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *     QuickLink:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - path
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         path:
 *           type: string
 *         requiresLogin:
 *           type: boolean
 *           default: false
 *     HomeContent:
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
 *         heroImageUrl:
 *           type: string
 *           description: Path under /public/data/images deployed with the frontend repo
 *         myLinksOverrides:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/TileOverride'
 *         corporateLinksOverrides:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/TileOverride'
 *         quickLinks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuickLink'
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
 *         heroImageUrl: "/data/images/hero-custom.jpg"
 *         myLinksOverrides:
 *           about:
 *             name: "About Me"
 *             description: "Learn more about who I am"
 *         corporateLinksOverrides: {}
 *         quickLinks:
 *           - id: "assignments"
 *             title: "Assignments"
 *             description: "View CSCE242 course assignments"
 *             path: "/assignments"
 *             requiresLogin: false
 *         updatedBy: "john"
 */

/**
 * @openapi
 * /homecontent:
 *   get:
 *     summary: Get all home content records
 *     tags:
 *       - HomeContent
 *     responses:
 *       200:
 *         description: List of home content records (client filters by installationId)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HomeContent'
 */
router.get("/", homeContentController.getAllHomeContent);

/**
 * @openapi
 * /homecontent/{id}:
 *   get:
 *     summary: Get a home content record by ID
 *     tags:
 *       - HomeContent
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Home content record ID
 *     responses:
 *       200:
 *         description: Home content found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HomeContent'
 *       404:
 *         description: Home content not found
 */
router.get("/:id", homeContentController.getHomeContentById);

/**
 * @openapi
 * /homecontent:
 *   post:
 *     summary: Create a new home content record
 *     tags:
 *       - HomeContent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HomeContent'
 *     responses:
 *       201:
 *         description: Home content created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HomeContent'
 *       400:
 *         description: Invalid input
 */
router.post("/", homeContentController.createHomeContent);

/**
 * @openapi
 * /homecontent/{id}:
 *   put:
 *     summary: Update a home content record
 *     tags:
 *       - HomeContent
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Home content record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HomeContent'
 *     responses:
 *       200:
 *         description: Home content updated
 *       404:
 *         description: Home content not found
 */
router.put("/:id", homeContentController.updateHomeContent);

/**
 * @openapi
 * /homecontent/{id}:
 *   delete:
 *     summary: Delete a home content record
 *     tags:
 *       - HomeContent
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Home content record ID
 *     responses:
 *       200:
 *         description: Home content deleted
 *       404:
 *         description: Home content not found
 */
router.delete("/:id", homeContentController.deleteHomeContent);

module.exports = router;
