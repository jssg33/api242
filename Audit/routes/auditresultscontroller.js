// Audit/routes/auditresultscontroller.js — port of auditresultscontroller.cs's MapApiAuditResultEndpoints,
// "/api/ApiAuditResults". "/errorseries" and "/hostseries" are registered before "/:id" since both are literal
// GET paths that the generic "/:id" GET would otherwise swallow.
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/auditresultscontroller");

router.param("id", objectIdParam);
const GROUP = "/api/ApiAuditResults";

/**
 * @openapi
 * components:
 *   schemas:
 *     AuditResult:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         auditDate: { type: string, format: date-time }
 *         totalApiHosts: { type: number }
 *         apiHostsSecure: { type: number }
 *         apiHostsInsecure: { type: number }
 *         totalApiEndpoints: { type: number }
 *         totalEndpointsSecure: { type: number }
 *         totalEndpointsInsecure: { type: number }
 *         auditorId: { type: number }
 *         auditorName: { type: string }
 *         sourceNetwork: { type: string }
 *         sourceIp: { type: string }
 *         notes: { type: string }
 * /api/ApiAuditResults/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all audit runs, newest first (port of IAuditResultService03.GetAll03)
 *     tags: [AuditResults]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Save an audit run; stamps sourceIp and captures a ticket snapshot (port of IAuditResultService03.Create03)
 *     tags: [AuditResults]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditResult' } } } }
 *     responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/ApiAuditResults/errorseries/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Error counts per run per ApiRoot, from ApiauditRunHistory (port of IAuditResultService03.GetErrorSeries03)
 *     tags: [AuditResults]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/ApiAuditResults/hostseries/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Distinct endpoint/EPG counts per run per host, from ApiauditRunHistory (port of IAuditResultService03.GetHostSeries03)
 *     tags: [AuditResults]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/ApiAuditResults/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get an audit run by id, as a one-item array (port of IAuditResultService03.GetById03)
 *     tags: [AuditResults]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   put:
 *     summary: Update an audit run (port of IAuditResultService03.Update03)
 *     tags: [AuditResults]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditResult' } } } }
 *     responses: { 202: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete an audit run (port of IAuditResultService03.Delete03)
 *     tags: [AuditResults]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.get(secure("/errorseries"), fusionAuth, controller.getErrorSeries);
credentialHint(router, GROUP, "GET", "/errorseries");
router.get(secure("/hostseries"), fusionAuth, controller.getHostSeries);
credentialHint(router, GROUP, "GET", "/hostseries");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
