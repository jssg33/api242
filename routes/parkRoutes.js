const express = require("express");
const router = express.Router();
const parkController = require("../controllers/parkController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Park:
 *       type: object
 *       required:
 *         - parkId
 *         - name
 *       properties:
 *         parkId:
 *           type: number
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         phone:
 *           type: string
 *         region:
 *           type: string
 *         trailLengthMiles:
 *           type: number
 *         difficulty:
 *           type: string
 *         description:
 *           type: string
 *         dayPassPriceUsd:
 *           type: number
 *         longitude:
 *           type: number
 *         latitude:
 *           type: number
 *         trailmapurl:
 *           type: string
 *         parklogourl:
 *           type: string
 *         state:
 *           type: string
 *         pic1url:
 *           type: string
 *         pic2url:
 *           type: string
 *         pic3url:
 *           type: string
 *         pic4url:
 *           type: string
 *         pic5url:
 *           type: string
 *         pic6url:
 *           type: string
 *         pic7url:
 *           type: string
 *         pic8url:
 *           type: string
 *         pic9url:
 *           type: string
 *         isnationalpark:
 *           type: string
 *         isstatepark:
 *           type: string
 *         hqbranchid:
 *           type: string
 *         mountainbikes:
 *           type: number
 *         camping:
 *           type: number
 *         rafting:
 *           type: number
 *         canoeing:
 *           type: number
 *         frisbee:
 *           type: number
 *         iscanadian:
 *           type: number
 *         ismexican:
 *           type: number
 *         motocross:
 *           type: number
 *         cabins:
 *           type: number
 *         tents:
 *           type: number
 *         skiing:
 *           type: number
 *         averageRating:
 *           type: number
 *         id:
 *           type: string
 *         reviews:
 *           type: string
 *         childPrice:
 *           type: number
 *         adultPrice:
 *           type: number
 *         maxvisitors:
 *           type: number
 *         currentvisitors:
 *           type: number
 *         currentvisitorschildren:
 *           type: number
 *         currentvisitorsadults:
 *           type: number
 *         maxcampsites:
 *           type: number
 *         currentcampsites:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /parks:
 *   get:
 *     tags: [Parks]
 *     summary: Get all parks
 *     responses:
 *       200:
 *         description: List of parks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Park"
 */
router.get("/", parkController.getParks);

/**
 * @swagger
 * /parks:
 *   post:
 *     tags: [Parks]
 *     summary: Create a new park
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Park"
 *     responses:
 *       201:
 *         description: Park created
 */
router.post("/", parkController.createPark);

/**
 * @swagger
 * /parks/{id}:
 *   get:
 *     tags: [Parks]
 *     summary: Get a park by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Park found
 *       404:
 *         description: Park not found
 */
router.get("/:id", parkController.getParkById);

/**
 * @swagger
 * /parks/{id}:
 *   put:
 *     tags: [Parks]
 *     summary: Update a park
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
 *             $ref: "#/components/schemas/Park"
 *     responses:
 *       200:
 *         description: Park updated
 *       404:
 *         description: Park not found
 */
router.put("/:id", parkController.updatePark);

/**
 * @swagger
 * /parks/{id}:
 *   delete:
 *     tags: [Parks]
 *     summary: Delete a park
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Park deleted
 *       404:
 *         description: Park not found
 */
router.delete("/:id", parkController.deletePark);

/**
 * @swagger
 * /parks/state/{state}:
 *   get:
 *     tags: [Parks]
 *     summary: Get parks by state
 *     parameters:
 *       - in: path
 *         name: state
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Parks in the state
 */
router.get("/state/:state", parkController.getParksByState);

module.exports = router;
