// Audit/routes/apiauditrunhistorycontroller.js
// Port of the endpoints mapped by analyticsgen4rev2/Audit/apiauditrunhistorycontroller.cs's
// MapApiauditRunHistoryEndpoints, at "/api/ApiauditRunHistory", FusionAuth-secured. Read-only (see controller).
const express = require("express");
const router = express.Router();
const { numberParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/apiauditrunhistorycontroller");

router.param("apiauditId", numberParam);
router.param("auditResultId", numberParam);

const GROUP = "/api/ApiauditRunHistory";

/**
 * @openapi
 * components:
 *   schemas:
 *     ApiauditRunHistory:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         apiauditId: { type: number }
 *         auditResultId: { type: number }
 *         apiRoot: { type: string }
 *         hostName: { type: string }
 *         url: { type: string }
 *         endpointType: { type: string }
 *         statusCode: { type: number }
 *         responseMs: { type: number }
 *         isError: { type: boolean }
 *         auditDate: { type: string, format: date-time }
 *         recordedDate: { type: string, format: date-time }
 * /api/ApiauditRunHistory/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Every audit-run history row, newest first (port of IApiauditRunHistoryService07.GetAll07)
 *     tags: [ApiauditRunHistory]
 *     parameters:
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses:
 *       200: { description: OK }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
 * /api/ApiauditRunHistory/endpoint/{apiauditId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: History for one endpoint (port of IApiauditRunHistoryService07.GetByEndpoint07)
 *     tags: [ApiauditRunHistory]
 *     parameters:
 *       - { in: path, name: apiauditId, required: true, schema: { type: integer } }
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses:
 *       200: { description: OK }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
 * /api/ApiauditRunHistory/run/{auditResultId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: History for one audit run (port of IApiauditRunHistoryService07.GetByRun07)
 *     tags: [ApiauditRunHistory]
 *     parameters:
 *       - { in: path, name: auditResultId, required: true, schema: { type: integer } }
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses:
 *       200: { description: OK }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.get(secure("/endpoint/:apiauditId"), fusionAuth, controller.getByEndpoint);
credentialHint(router, GROUP, "GET", "/endpoint/:apiauditId");
router.get(secure("/run/:auditResultId"), fusionAuth, controller.getByRun);
credentialHint(router, GROUP, "GET", "/run/:auditResultId");

module.exports = router;
