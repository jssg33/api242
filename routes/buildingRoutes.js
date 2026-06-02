const express = require("express");
const router = express.Router();
const controller = require("../controllers/buildingController");

/**
 * @openapi
 * components:
 *   schemas:
 *     Building:
 *       type: object
 *       required:
 *         - buildingid
 *         - primaryLatitude
 *         - primaryLongitude
 *         - geolat1
 *         - geolong1
 *         - geolat2
 *         - geolong2
 *         - geolat3
 *         - geolong3
 *         - geolat4
 *         - geolong4
 *         - geolat5
 *         - geolong5
 *         - campusname
 *         - campusid
 *         - address1
 *         - city
 *         - state
 *         - zip
 *       properties:
 *         _id:
 *           type: string
 *         buildingid:
 *           type: string
 *         primaryLatitude:
 *           type: number
 *         primaryLongitude:
 *           type: number
 *         geofenceid:
 *           type: string
 *         geolat1:
 *           type: number
 *         geolong1:
 *           type: number
 *         geolat2:
 *           type: number
 *         geolong2:
 *           type: number
 *         geolat3:
 *           type: number
 *         geolong3:
 *           type: number
 *         geolat4:
 *           type: number
 *         geolong4:
 *           type: number
 *         geolat5:
 *           type: number
 *         geolong5:
 *           type: number
 *         campusname:
 *           type: string
 *         campusid:
 *           type: string
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
 */

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
 */

/**
 * @openapi
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
