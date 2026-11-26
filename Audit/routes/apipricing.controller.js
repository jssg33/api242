// Audit/routes/apipricing.controller.js — port of apipricing.controller.cs's MapApiPricingEndpoints,
// "/api/apipricing". The C# source hand-rolls its own 1002 no-credentials handlers rather than using
// FusionAuth.MapCredentialHints; credentialHint produces the same response shape here.
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/apipricing.controller");

router.param("id", objectIdParam);
const GROUP = "/api/apipricing";

/**
 * @openapi
 * components:
 *   schemas:
 *     ApiPricing:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         apiGroup: { type: string }
 *         description: { type: string }
 *         pricePerUse: { type: number }
 *         active: { type: boolean }
 * /api/apipricing/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all API pricing rows (port of 02GetApiPricing)
 *     tags: [ApiPricing]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create an API pricing row (port of 06CreateApiPricing)
 *     tags: [ApiPricing]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/ApiPricing' } } } }
 *     responses: { 200: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/apipricing/sync/{apiusername}/{apipassword}/{token}:
 *   post:
 *     summary: Insert one pricing row per distinct controller seen in ApiInterfacesAudit, not already priced (port of 11SyncApiPricing)
 *     tags: [ApiPricing]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: "{ success, inserted }" }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/apipricing/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get an API pricing row by id (port of 04GetApiPricingById)
 *     tags: [ApiPricing]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   put:
 *     summary: Update an API pricing row (port of 08UpdateApiPricing)
 *     tags: [ApiPricing]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/ApiPricing' } } } }
 *     responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete an API pricing row (port of 10DeleteApiPricing)
 *     tags: [ApiPricing]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.post(secure("/sync"), fusionAuth, controller.sync);
credentialHint(router, GROUP, "POST", "/sync");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
