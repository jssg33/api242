// Audit/routes/auditbatchapicontroller.js — port of auditbatchapicontroller.cs's MapAuditBatchApiEndpoints, "/api/AuditBatchApi".
const express = require("express");
const router = express.Router();
const { objectIdParam, numberParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/auditbatchapicontroller");

router.param("id", objectIdParam);
router.param("auditResultId", numberParam);

const GROUP = "/api/AuditBatchApi";

/**
 * @openapi
 * components:
 *   schemas:
 *     AuditBatchApi:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         auditResultId: { type: number }
 *         auditDate: { type: string, format: date-time }
 *         apiHostId: { type: number }
 *         apiHostName: { type: string }
 *         endpointsAudited: { type: number }
 *         passCount: { type: number }
 *         warnCount: { type: number }
 *         failCount: { type: number }
 *         secureCount: { type: number }
 *         insecureCount: { type: number }
 *         epCount: { type: number }
 *         epgCount: { type: number }
 * /api/AuditBatchApi/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all batch rollups (port of IAuditBatchApiService06.GetAll06)
 *     tags: [AuditBatchApi]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create a batch rollup row (port of IAuditBatchApiService06.Create06)
 *     tags: [AuditBatchApi]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditBatchApi' } } } }
 *     responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/AuditBatchApi/run/{auditResultId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get batch rollups for one audit run (port of IAuditBatchApiService06.GetByRun06)
 *     tags: [AuditBatchApi]
 *     parameters:
 *       - { in: path, name: auditResultId, required: true, schema: { type: integer } }
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/AuditBatchApi/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get a batch rollup by id, as a one-item array (port of IAuditBatchApiService06.GetById06)
 *     tags: [AuditBatchApi]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete a batch rollup row (port of IAuditBatchApiService06.Delete06)
 *     tags: [AuditBatchApi]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.get(secure("/run/:auditResultId"), fusionAuth, controller.getByRun);
credentialHint(router, GROUP, "GET", "/run/:auditResultId");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
