// Audit/routes/structureingest.controller.js
// Port of analyticsgen4rev2/Audit/structureingest.controller.cs's MapStructureIngestEndpoints, at
// "/api/structureingest". NOT FusionAuth-secured in the C# source either — this uses its own X-Auditor-Key
// header scheme instead (see the controller), so no fusionAuth middleware here.
const express = require("express");
const router = express.Router();
const controller = require("../controllers/structureingest.controller");

/**
 * @openapi
 * /api/structureingest:
 *   post:
 *     summary: Store one structure snapshot posted by a monitored API (port of IStructureIngestService02.IngestApiStructure02)
 *     tags: [StructureIngest]
 *     parameters:
 *       - in: header
 *         name: X-Auditor-Key
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sourceApi: { type: string }
 *               sourceHost: { type: string }
 *               databaseType: { type: string }
 *               auditDateUtc: { type: string, format: date-time }
 *               tables:
 *                 type: array
 *                 items: { type: object }
 *               fields:
 *                 type: array
 *                 items: { type: object }
 *     responses:
 *       200: { description: Stored }
 *       400: { description: Bad request }
 *       401: { description: Missing or invalid X-Auditor-Key }
 * /api/structureingest/{sourceApi}/latest:
 *   get:
 *     summary: Most recent structure snapshot a monitored API sent (port of IStructureIngestService02.GetLatestApiStructure02)
 *     tags: [StructureIngest]
 *     parameters:
 *       - { in: path, name: sourceApi, required: true, schema: { type: string } }
 *       - in: header
 *         name: X-Auditor-Key
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Latest snapshot JSON }
 *       404: { description: No snapshot found }
 *       401: { description: Missing or invalid X-Auditor-Key }
 */
router.post("/", controller.ingest);
router.get("/:sourceApi/latest", controller.getLatest);

module.exports = router;
