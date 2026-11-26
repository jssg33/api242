// Audit/routes/apienterprisenine.controller.js — port of apienterprisenine.controller.cs's
// MapEnterprise9Endpoints, "/api/enterprise9". "/required" and "/discovery" (literal GETs) are registered
// before the generic "/:id" GET.
const express = require("express");
const router = express.Router();
const { objectIdParam, numberParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/apienterprisenine.controller");

router.param("id", objectIdParam);
router.param("apiHostId", numberParam);

const GROUP = "/api/enterprise9";

/**
 * @openapi
 * components:
 *   schemas:
 *     Enterprise9:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         apiHostId: { type: number }
 *         apiHostName: { type: string }
 *         logName: { type: string }
 *         isRequired: { type: boolean }
 *         isImplemented: { type: boolean }
 * /api/enterprise9/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all Enterprise9 log rows (port of GetEnterprise9)
 *     tags: [Enterprise9]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create an Enterprise9 log row (port of CreateEnterprise9)
 *     tags: [Enterprise9]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/Enterprise9' } } } }
 *     responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/enterprise9/bulk/{apiusername}/{apipassword}/{token}:
 *   post:
 *     summary: Create many Enterprise9 log rows at once (port of CreateEnterprise9Bulk)
 *     tags: [Enterprise9]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { type: array, items: { $ref: '#/components/schemas/Enterprise9' } } } } }
 *     responses: { 200: { description: OK }, 400: { description: Bad request }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/enterprise9/required/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Required log rows (port of GetRequiredEnterprise9)
 *     tags: [Enterprise9]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/enterprise9/discovery/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Discovery metadata for this controller (port of DiscoveryEnterprise9)
 *     tags: [Enterprise9]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/enterprise9/host/{apiHostId}/summary/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Required/implemented/missing counts for one host (port of Enterprise9Summary)
 *     tags: [Enterprise9]
 *     parameters: [{ in: path, name: apiHostId, required: true, schema: { type: integer } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/enterprise9/host/{apiHostId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Log rows for one host (port of GetEnterprise9ByHost)
 *     tags: [Enterprise9]
 *     parameters: [{ in: path, name: apiHostId, required: true, schema: { type: integer } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/enterprise9/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get a log row by id (port of GetEnterprise9ById)
 *     tags: [Enterprise9]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   put:
 *     summary: Update a log row (port of UpdateEnterprise9)
 *     tags: [Enterprise9]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/Enterprise9' } } } }
 *     responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete a log row (port of DeleteEnterprise9)
 *     tags: [Enterprise9]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.post(secure("/bulk"), fusionAuth, controller.createBulk);
credentialHint(router, GROUP, "POST", "/bulk");
router.get(secure("/required"), fusionAuth, controller.getRequired);
credentialHint(router, GROUP, "GET", "/required");
router.get(secure("/discovery"), fusionAuth, controller.discoveryInfo);
credentialHint(router, GROUP, "GET", "/discovery");
router.get(secure("/host/:apiHostId/summary"), fusionAuth, controller.getHostSummary);
credentialHint(router, GROUP, "GET", "/host/:apiHostId/summary");
router.get(secure("/host/:apiHostId"), fusionAuth, controller.getByHost);
credentialHint(router, GROUP, "GET", "/host/:apiHostId");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
