// Audit/routes/auditapplication.version.controller.js — port of auditapplication.version.controller.cs's
// MapAuditApplicationVersions, "/AuditApplicationVersions" (no "/api" prefix in the C# source either).
const express = require("express");
const router = express.Router();
const { objectIdParam, numberParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/auditapplication.version.controller");

router.param("id", objectIdParam);
router.param("applicationId", numberParam);

const GROUP = "/AuditApplicationVersions";

/**
 * @openapi
 * components:
 *   schemas:
 *     AuditApplicationVersion:
 *       type: object
 *       description: Full field list ported from Enterprise.Models.AuditApplicationVersion; see Audit/models/auditapplicationversion.model.js.
 *       properties:
 *         _id: { type: string }
 *         auditApplicationId: { type: number }
 *         versionNumber: { type: string }
 *         releaseType: { type: string }
 *         isCurrentVersion: { type: boolean }
 *         isActive: { type: boolean }
 * /AuditApplicationVersions/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all application versions (port of AuditApplicationVersions.GetAll)
 *     tags: [AuditApplicationVersions]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create an application version (port of AuditApplicationVersions.Create)
 *     tags: [AuditApplicationVersions]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditApplicationVersion' } } } }
 *     responses: { 200: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /AuditApplicationVersions/Application/{applicationId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Versions for one application, newest release first (port of AuditApplicationVersions.GetByApplication)
 *     tags: [AuditApplicationVersions]
 *     parameters: [{ in: path, name: applicationId, required: true, schema: { type: integer } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /AuditApplicationVersions/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get an application version by id (port of AuditApplicationVersions.GetById)
 *     tags: [AuditApplicationVersions]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   put:
 *     summary: Update an application version (port of AuditApplicationVersions.Update)
 *     tags: [AuditApplicationVersions]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditApplicationVersion' } } } }
 *     responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete an application version (port of AuditApplicationVersions.Delete)
 *     tags: [AuditApplicationVersions]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.get(secure("/Application/:applicationId"), fusionAuth, controller.getByApplication);
credentialHint(router, GROUP, "GET", "/Application/:applicationId");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
