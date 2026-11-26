// Audit/routes/apiauditexceptionscontroller.js — port of apiauditexceptionscontroller.cs's
// MapApiAuditExceptionEndpoints, "/api/AuditExceptions".
const express = require("express");
const router = express.Router();
const { objectIdParam, numberParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/apiauditexceptionscontroller");

router.param("id", objectIdParam);
router.param("apiAuditId", numberParam);

const GROUP = "/api/AuditExceptions";

/**
 * @openapi
 * components:
 *   schemas:
 *     AuditException:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         apiAuditId: { type: number }
 *         reason: { type: string }
 *         approvedBy: { type: string }
 *         approvalDate: { type: string, format: date-time }
 *         expirationDate: { type: string, format: date-time }
 *         active: { type: boolean }
 *         notes: { type: string }
 *         apiRootUrl: { type: string }
 *         apiEndpointPath: { type: string }
 * /api/AuditExceptions/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all audit exceptions (port of IAuditExceptionService14.GetAll14)
 *     tags: [AuditExceptions]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create an audit exception (port of IAuditExceptionService14.Create14)
 *     tags: [AuditExceptions]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditException' } } } }
 *     responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/AuditExceptions/audit/{apiAuditId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get exceptions for one audited endpoint (port of IAuditExceptionService14.GetByApiAuditId14)
 *     tags: [AuditExceptions]
 *     parameters: [{ in: path, name: apiAuditId, required: true, schema: { type: integer } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/AuditExceptions/active/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get active audit exceptions (port of IAuditExceptionService14.GetActive14)
 *     tags: [AuditExceptions]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/AuditExceptions/{id}/{apiusername}/{apipassword}/{token}:
 *   put:
 *     summary: Update an audit exception (port of IAuditExceptionService14.Update14)
 *     tags: [AuditExceptions]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditException' } } } }
 *     responses: { 202: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete an audit exception (port of IAuditExceptionService14.Delete14)
 *     tags: [AuditExceptions]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.get(secure("/audit/:apiAuditId"), fusionAuth, controller.getByApiAuditId);
credentialHint(router, GROUP, "GET", "/audit/:apiAuditId");
router.get(secure("/active"), fusionAuth, controller.getActive);
credentialHint(router, GROUP, "GET", "/active");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
