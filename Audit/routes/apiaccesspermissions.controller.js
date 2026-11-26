// Audit/routes/apiaccesspermissions.controller.js
// Port of analyticsgen4rev2/Audit/apiaccesspermissions.controller.cs's MapApiAccessPermissionsEndpoints, at
// "/api/apiaccesspermissions", FusionAuth-secured.
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/apiaccesspermissions.controller");

router.param("id", objectIdParam);

const GROUP = "/api/apiaccesspermissions";

/**
 * @openapi
 * components:
 *   schemas:
 *     ApiAccessPermission:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         userId: { type: number }
 *         apiId: { type: number }
 *         permissionLevel: { type: string }
 *         isEnabled: { type: boolean }
 *         createdDate: { type: string, format: date-time }
 *         grantedBy: { type: string }
 *         grantedDate: { type: string, format: date-time }
 *         expirationDate: { type: string, format: date-time }
 *         reviewedDate: { type: string, format: date-time }
 *         reviewedBy: { type: string }
 * /api/apiaccesspermissions/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all API access permissions (port of 01GetApiAccessPermissions)
 *     tags: [ApiAccessPermissions]
 *     parameters:
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses:
 *       200: { description: OK }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
 *   post:
 *     summary: Create an API access permission (port of 03CreateApiAccessPermission)
 *     tags: [ApiAccessPermissions]
 *     parameters:
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ApiAccessPermission' }
 *     responses:
 *       201: { description: Created }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
 * /api/apiaccesspermissions/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get one API access permission (port of 02GetApiAccessPermission)
 *     tags: [ApiAccessPermissions]
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
 *   put:
 *     summary: Update an API access permission (port of 04UpdateApiAccessPermission)
 *     tags: [ApiAccessPermissions]
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ApiAccessPermission' }
 *     responses:
 *       200: { description: Updated }
 *       404: { description: Not found }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
 *   delete:
 *     summary: Delete an API access permission (port of 05DeleteApiAccessPermission)
 *     tags: [ApiAccessPermissions]
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses:
 *       204: { description: Deleted }
 *       404: { description: Not found }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
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
