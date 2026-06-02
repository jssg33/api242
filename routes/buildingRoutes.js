// routes/buildingRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/buildingController");

/**
 * @openapi
 * /api/buildings:
 *   get:
 *     summary: Get all buildings
 *     tags:
 *       - Buildings
 *     responses:
 *       200:
 *         description: List of buildings
 *   post:
 *     summary: Create a new building
 *     tags:
 *       - Buildings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Building'
 *     responses:
 *       201:
 *         description: Building created
 *
 * /api/buildings/{id}:
 *   get:
 *     summary: Get a building by ID
 *     tags:
 *       - Buildings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Building found
 *       404:
 *         description: Building not found
 *   put:
 *     summary: Update a building
 *     tags:
 *       - Buildings
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
 *             $ref: '#/components/schemas/Building'
 *     responses:
 *       200:
 *         description: Building updated
 *   delete:
 *     summary: Delete a building
 *     tags:
 *       - Buildings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Building deleted
 */

router.get("/", controller.getBuildings);
router.post("/", controller.createBuilding);
router.get("/:id", controller.getBuildingById);
router.put("/:id", controller.updateBuilding);
router.delete("/:id", controller.deleteBuilding);

module.exports = router;
