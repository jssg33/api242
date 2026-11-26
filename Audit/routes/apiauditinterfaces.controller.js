// Audit/routes/apiauditinterfaces.controller.js — port of apiauditinterfaces.controller.cs's
// MapApiInterfacesAuditEndpoints, "/api/ApiInterfacesAudit".
const express = require("express");
const router = express.Router();
const { objectIdParam, numberParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/apiauditinterfaces.controller");

router.param("id", objectIdParam);
router.param("apiAuditId", numberParam);

const GROUP = "/api/ApiInterfacesAudit";

/**
 * @openapi
 * components:
 *   schemas:
 *     ApiInterfacesAudit:
 *       type: object
 *       description: Full field list ported from Enterprise.Models.ApiInterfacesAudit; see Audit/models/apiauditinterfaces.model.js.
 *       properties:
 *         _id: { type: string }
 *         interfaceName: { type: string }
 *         methodName: { type: string }
 *         isImplemented: { type: boolean }
 *         isRegistered: { type: boolean }
 * /api/ApiInterfacesAudit/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all interface audit rows (port of IApiInterfacesAuditService15.GetAll15)
 *     tags: [ApiInterfacesAudit]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create an interface audit row (port of IApiInterfacesAuditService15.Create15)
 *     tags: [ApiInterfacesAudit]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/ApiInterfacesAudit' } } } }
 *     responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/ApiInterfacesAudit/audit/{apiAuditId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Rows for one audited endpoint (port of IApiInterfacesAuditService15.GetByApiAuditId15)
 *     tags: [ApiInterfacesAudit]
 *     parameters: [{ in: path, name: apiAuditId, required: true, schema: { type: integer } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/ApiInterfacesAudit/interface/{interfaceName}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Rows for one interface name (port of IApiInterfacesAuditService15.GetByInterface15)
 *     tags: [ApiInterfacesAudit]
 *     parameters: [{ in: path, name: interfaceName, required: true, schema: { type: string } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/ApiInterfacesAudit/{id}/{apiusername}/{apipassword}/{token}:
 *   put:
 *     summary: Update an interface audit row (port of IApiInterfacesAuditService15.Update15)
 *     tags: [ApiInterfacesAudit]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/ApiInterfacesAudit' } } } }
 *     responses: { 202: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete an interface audit row (port of IApiInterfacesAuditService15.Delete15)
 *     tags: [ApiInterfacesAudit]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.get(secure("/audit/:apiAuditId"), fusionAuth, controller.getByApiAuditId);
credentialHint(router, GROUP, "GET", "/audit/:apiAuditId");
router.get(secure("/interface/:interfaceName"), fusionAuth, controller.getByInterface);
credentialHint(router, GROUP, "GET", "/interface/:interfaceName");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
