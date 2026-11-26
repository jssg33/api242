// Audit/routes/apihost.controller.js — port of apihost.controller.cs's MapApihostEndpoints, "/api/Apihosts".
// "/Inventory" and "/AuditTargets" (literal GETs) are registered before the generic "/:id" GET.
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/apihost.controller");

router.param("id", objectIdParam);
const GROUP = "/api/Apihosts";

/**
 * @openapi
 * components:
 *   schemas:
 *     Apihost:
 *       type: object
 *       description: Full field list (~75) ported from Enterprise.Models.Apihost; see Audit/models/apihosts.model.js.
 *       properties:
 *         _id: { type: string }
 *         apiHostName: { type: string }
 *         apiHostUrl: { type: string }
 *         environment: { type: string }
 *         active: { type: boolean }
 *         isActive: { type: boolean }
 * /api/Apihosts/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all API hosts (port of IApihostService09.GetAll09)
 *     tags: [Apihosts]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create an API host (port of IApihostService09.Create09)
 *     tags: [Apihosts]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/Apihost' } } } }
 *     responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/Apihosts/Inventory/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Active hosts, alphabetical (port of IApihostService09.GetInventory09)
 *     tags: [Apihosts]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/Apihosts/AuditTargets/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Active hosts, projected to audit-target fields (port of IApihostService09.GetAuditTargets09)
 *     tags: [Apihosts]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/Apihosts/Validate/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get a host by id, 404 if missing (port of IApihostService09.GetValidated09)
 *     tags: [Apihosts]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/Apihosts/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get a host by id, as a one-item array (port of IApihostService09.GetById09)
 *     tags: [Apihosts]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   put:
 *     summary: Update a host (port of IApihostService09.Update09)
 *     tags: [Apihosts]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/Apihost' } } } }
 *     responses: { 202: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete a host (port of IApihostService09.Delete09)
 *     tags: [Apihosts]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.get(secure("/Inventory"), fusionAuth, controller.getInventory);
credentialHint(router, GROUP, "GET", "/Inventory");
router.get(secure("/AuditTargets"), fusionAuth, controller.getAuditTargets);
credentialHint(router, GROUP, "GET", "/AuditTargets");
router.get(secure("/Validate/:id"), fusionAuth, controller.getValidated);
credentialHint(router, GROUP, "GET", "/Validate/:id");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
