// Audit/routes/apiservices.controller.js — port of apiservices.controller.cs's MapApiServicesEndpoints,
// "/api/apiservices". "/active/list" and "/discovery" (literal GETs) are registered before the generic "/:id" GET.
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/apiservices.controller");

router.param("id", objectIdParam);
const GROUP = "/api/apiservices";

/**
 * @openapi
 * components:
 *   schemas:
 *     ApiService:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         serviceName: { type: string }
 *         interfaceName: { type: string }
 *         serviceType: { type: string }
 *         apiHostId: { type: number }
 *         apiHostName: { type: string }
 *         isActive: { type: boolean }
 * /api/apiservices/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all API services (port of GetApiServices)
 *     tags: [ApiServices]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create an API service (port of CreateApiService)
 *     tags: [ApiServices]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/ApiService' } } } }
 *     responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/apiservices/bulk/{apiusername}/{apipassword}/{token}:
 *   post:
 *     summary: Create many API services at once (port of CreateApiServicesBulk)
 *     tags: [ApiServices]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { type: array, items: { $ref: '#/components/schemas/ApiService' } } } } }
 *     responses: { 200: { description: OK }, 400: { description: Bad request }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/apiservices/active/list/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Active API services, alphabetical (port of GetActiveApiServices)
 *     tags: [ApiServices]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/apiservices/discovery/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Discovery metadata for this controller (port of DiscoveryApiServices)
 *     tags: [ApiServices]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/apiservices/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get an API service by id (port of GetApiService)
 *     tags: [ApiServices]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   put:
 *     summary: Update an API service (port of UpdateApiService)
 *     tags: [ApiServices]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/ApiService' } } } }
 *     responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete an API service (port of DeleteApiService)
 *     tags: [ApiServices]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.post(secure("/bulk"), fusionAuth, controller.createBulk);
credentialHint(router, GROUP, "POST", "/bulk");
router.get(secure("/active/list"), fusionAuth, controller.getActive);
credentialHint(router, GROUP, "GET", "/active/list");
router.get(secure("/discovery"), fusionAuth, controller.discoveryInfo);
credentialHint(router, GROUP, "GET", "/discovery");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
