const express = require("express");
const router = express.Router();
const dto = require("../dtos/gcParksDto");

/**
 * @swagger
 * /api/GCPARKS:
 *   get:
 *     summary: Get CGPARKS DTO (Parks + Embedded Reviews)
 *     tags: [GCPARKS]
 *     responses:
 *       200:
 *         description: List of CGPARKS DTO objects
 */
router.get("/", dto.getGCParks);

module.exports = router;
