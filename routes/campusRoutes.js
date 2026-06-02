const express = require("express");
const router = express.Router();
const controller = require("../controllers/campusController");

/**
 * @openapi
 * components:
 *   schemas:
 *     Campus:
 *       type: object
 *       required:
 *         - campusid
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB ObjectId
 *
 *         campusid:
 *           type: string
 *           description: Secondary key for the campus
 *
 *         companyid:
 *           type: string
 *         university:
 *           type: string
 *
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
 *
 *         phone:
 *           type: string
 *         fax:
 *           type: string
 *         email:
 *           type: string
 *
 *         administrationBuildingId:
 *           type: string
 *           description: buildingid of the administration building
 *
 *         logourl:
 *           type: string
 *           format: uri
 */

/**
 * @openapi
 * /api/campuses:
 *   get:
 *     summary: Get all campuses
 *     tags:
 *       - Campuses
 *     responses:
 *       200:
 *         description: List of campuses
 *
 *   post:
 *     summary: Create a new campus
 *     tags:
 *       - Campuses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Campus'
 *     responses:
 *       201:
 *         description: Campus created
 */

/**
 * @openapi
 * /api/campuses/{id}:
 *   get:
 *     summary: Get a campus by ID
 *     tags:
 *       - Campuses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Campus found
 *       404:
 *         description: Campus not found
 *
 *   put:
 *     summary: Update a campus
 *     tags:
 *       - Campuses
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
 *             $ref: '#/components/schemas/Campus'
 *     responses:
 *       200:
 *         description: Campus updated
 *
 *   delete:
 *     summary: Delete a campus
 *     tags:
 *       - Campuses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Campus deleted
 */

router.get("/", controller.getCampuses);
router.post("/", controller.createCampus);
router.get("/:id", controller.getCampusById);
router.put("/:id", controller.updateCampus);
router.delete("/:id", controller.deleteCampus);

module.exports = router;
