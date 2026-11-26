// Audit/routes/auditticketsnapshotcontroller.js
// Port of the endpoints mapped by analyticsgen4rev2/Audit/auditticketsnapshotcontroller.cs's
// MapAuditTicketSnapshotEndpoints, at "/api/AuditTicketSnapshot", FusionAuth-secured.
const express = require("express");
const router = express.Router();
const { numberParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/auditticketsnapshotcontroller");

router.param("auditResultId", numberParam);

const GROUP = "/api/AuditTicketSnapshot";

/**
 * @openapi
 * components:
 *   schemas:
 *     AuditTicketSnapshot:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         auditResultId: { type: number }
 *         snapshotDate: { type: string, format: date-time }
 *         ticketSource: { type: string }
 *         apiName: { type: string }
 *         openCount: { type: number }
 *         inProgressCount: { type: number }
 *         hardDownCount: { type: number }
 *         inQueueCount: { type: number }
 * /api/AuditTicketSnapshot/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Every snapshot row (port of IAuditTicketSnapshotService01.GetAll01)
 *     tags: [AuditTicketSnapshot]
 *     parameters:
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses:
 *       200: { description: OK }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
 * /api/AuditTicketSnapshot/series/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: One point per snapshot with queue totals (port of IAuditTicketSnapshotService01.GetSeries01)
 *     tags: [AuditTicketSnapshot]
 *     parameters:
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses:
 *       200: { description: OK }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
 * /api/AuditTicketSnapshot/capture/{apiusername}/{apipassword}/{token}:
 *   post:
 *     summary: Take a snapshot now, not tied to an audit run (port of IAuditTicketSnapshotService01.Capture01)
 *     tags: [AuditTicketSnapshot]
 *     parameters:
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses:
 *       200: { description: Rows written }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
 * /api/AuditTicketSnapshot/capture/{auditResultId}/{apiusername}/{apipassword}/{token}:
 *   post:
 *     summary: Snapshot tied to one audit run (port of IAuditTicketSnapshotService01.CaptureForRun01)
 *     tags: [AuditTicketSnapshot]
 *     parameters:
 *       - { in: path, name: auditResultId, required: true, schema: { type: integer } }
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses:
 *       200: { description: Rows written }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.get(secure("/series"), fusionAuth, controller.getSeries);
credentialHint(router, GROUP, "GET", "/series");
router.post(secure("/capture"), fusionAuth, controller.capture);
credentialHint(router, GROUP, "POST", "/capture");
router.post(secure("/capture/:auditResultId"), fusionAuth, controller.captureForRun);
credentialHint(router, GROUP, "POST", "/capture/:auditResultId");

module.exports = router;
