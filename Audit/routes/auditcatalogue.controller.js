// Audit/routes/auditcatalogue.controller.js — port of auditcatalogue.controller.cs's MapAuditCatalogueEndpoints,
// "/api/auditcatalogue". "/active" (literal GET) is registered before the generic "/:id" GET.
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/auditcatalogue.controller");

router.param("id", objectIdParam);
const GROUP = "/api/auditcatalogue";

/**
 * @openapi
 * components:
 *   schemas:
 *     AuditCatalogue:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         auditCode: { type: string }
 *         auditName: { type: string }
 *         category: { type: string }
 *         severity: { type: string }
 *         isAutomated: { type: boolean }
 *         isActive: { type: boolean }
 * /api/auditcatalogue/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all catalogue entries (port of IAuditCatalogueService11.GetAll11)
 *     tags: [AuditCatalogue]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create a catalogue entry (port of IAuditCatalogueService11.Create11)
 *     tags: [AuditCatalogue]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditCatalogue' } } } }
 *     responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/auditcatalogue/active/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get active catalogue entries (port of IAuditCatalogueService11.GetActive11)
 *     tags: [AuditCatalogue]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/auditcatalogue/category/{category}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get catalogue entries for one category (port of IAuditCatalogueService11.GetByCategory11)
 *     tags: [AuditCatalogue]
 *     parameters: [{ in: path, name: category, required: true, schema: { type: string } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/auditcatalogue/severity/{severity}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get catalogue entries for one severity (port of IAuditCatalogueService11.GetBySeverity11)
 *     tags: [AuditCatalogue]
 *     parameters: [{ in: path, name: severity, required: true, schema: { type: string } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/auditcatalogue/{id}/{apiusername}/{apipassword}/{token}:
 *   put:
 *     summary: Update a catalogue entry (port of IAuditCatalogueService11.Update11)
 *     tags: [AuditCatalogue]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditCatalogue' } } } }
 *     responses: { 202: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete a catalogue entry (port of IAuditCatalogueService11.Delete11)
 *     tags: [AuditCatalogue]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.get(secure("/active"), fusionAuth, controller.getActive);
credentialHint(router, GROUP, "GET", "/active");
router.get(secure("/category/:category"), fusionAuth, controller.getByCategory);
credentialHint(router, GROUP, "GET", "/category/:category");
router.get(secure("/severity/:severity"), fusionAuth, controller.getBySeverity);
credentialHint(router, GROUP, "GET", "/severity/:severity");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
