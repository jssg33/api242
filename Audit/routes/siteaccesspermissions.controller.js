// Audit/routes/siteaccesspermissions.controller.js — port of siteaccesspermissions.controller.cs's
// MapSiteAccessPermissionsEndpoints, "/api/siteaccesspermissions".
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/siteaccesspermissions.controller");

router.param("id", objectIdParam);
const GROUP = "/api/siteaccesspermissions";

/**
 * @openapi
 * components:
 *   schemas:
 *     SiteAccessPermission:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         userId: { type: number }
 *         siteId: { type: number }
 *         accessLevel: { type: string }
 *         isEnabled: { type: boolean }
 *         grantedDate: { type: string, format: date-time }
 *         grantedBy: { type: string }
 *         expirationDate: { type: string, format: date-time }
 *         reviewedDate: { type: string, format: date-time }
 *         reviewedBy: { type: string }
 * /api/siteaccesspermissions/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all site access permissions (port of ISiteAccessPermissionService26.GetAll26)
 *     tags: [SiteAccessPermissions]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create a site access permission (port of ISiteAccessPermissionService26.Create26)
 *     tags: [SiteAccessPermissions]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/SiteAccessPermission' } } } }
 *     responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/siteaccesspermissions/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get a site access permission by id (port of ISiteAccessPermissionService26.GetById26)
 *     tags: [SiteAccessPermissions]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   put:
 *     summary: Update a site access permission (port of ISiteAccessPermissionService26.Update26)
 *     tags: [SiteAccessPermissions]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/SiteAccessPermission' } } } }
 *     responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete a site access permission (port of ISiteAccessPermissionService26.Delete26)
 *     tags: [SiteAccessPermissions]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 204: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
