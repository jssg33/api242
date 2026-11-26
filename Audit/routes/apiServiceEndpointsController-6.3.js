// Audit/routes/apiServiceEndpointsController-6.3.js — port of apiServiceEndpointsController-6.3.cs's
// MapApiServiceEPSEndpoints, "/api/apiserviceendpoints".
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/apiServiceEndpointsController-6.3");

router.param("id", objectIdParam);
router.param("serviceId", objectIdParam);
router.param("apiAuditId", objectIdParam);

const GROUP = "/api/apiserviceendpoints";

/**
 * @openapi
 * components:
 *   schemas:
 *     ApiServiceEndpoint:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         serviceId: { type: string }
 *         apiAuditId: { type: string }
 *         apiHostId: { type: number }
 *         createdDate: { type: string, format: date-time }
 * /api/apiserviceendpoints/by-service/{serviceId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Endpoints linked to a service (port of GetEndpointsForService)
 *     tags: [ApiServiceEndpoints]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/apiserviceendpoints/by-endpoint/{apiAuditId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Services linked to an endpoint (port of GetServicesForEndpoint)
 *     tags: [ApiServiceEndpoints]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/apiserviceendpoints/{apiusername}/{apipassword}/{token}:
 *   post:
 *     summary: Link one endpoint to one service, idempotent (port of CreateServiceEndpointLink)
 *     tags: [ApiServiceEndpoints]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/ApiServiceEndpoint' } } } }
 *     responses: { 201: { description: Created }, 400: { description: Bad request }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/apiserviceendpoints/service/{serviceId}/set/{apiusername}/{apipassword}/{token}:
 *   post:
 *     summary: Replace all endpoints linked to a service in one call (port of SetServiceEndpoints)
 *     tags: [ApiServiceEndpoints]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { type: object, properties: { apiAuditIds: { type: array, items: { type: string } } } } } }
 *     responses: { 200: { description: OK }, 400: { description: Bad request }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/apiserviceendpoints/{id}/{apiusername}/{apipassword}/{token}:
 *   delete:
 *     summary: Delete a link by its own id (port of DeleteServiceEndpointLink)
 *     tags: [ApiServiceEndpoints]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/apiserviceendpoints/pair/{apiusername}/{apipassword}/{token}:
 *   delete:
 *     summary: Delete a link by (serviceId, apiAuditId) query pair (port of DeleteServiceEndpointPair)
 *     tags: [ApiServiceEndpoints]
 *     parameters:
 *       - { in: query, name: serviceId, required: true, schema: { type: string } }
 *       - { in: query, name: apiAuditId, required: true, schema: { type: string } }
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/by-service/:serviceId"), fusionAuth, controller.getByService);
credentialHint(router, GROUP, "GET", "/by-service/:serviceId");
router.get(secure("/by-endpoint/:apiAuditId"), fusionAuth, controller.getByEndpoint);
credentialHint(router, GROUP, "GET", "/by-endpoint/:apiAuditId");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.post(secure("/service/:serviceId/set"), fusionAuth, controller.setForService);
credentialHint(router, GROUP, "POST", "/service/:serviceId/set");
router.delete(secure("/pair"), fusionAuth, controller.removePair);
credentialHint(router, GROUP, "DELETE", "/pair");
router.delete(secure("/:id"), fusionAuth, controller.removeById);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
