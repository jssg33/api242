// Audit/routes/apiapplicationuser.controller.js — port of apiapplicationuser.controller.cs's
// MapApplicationAccessEndpoints, "/api/applicationaccess".
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/apiapplicationuser.controller");

router.param("id", objectIdParam);
router.param("applicationId", objectIdParam);
router.param("userId", objectIdParam);

const GROUP = "/api/applicationaccess";

/**
 * @openapi
 * components:
 *   schemas:
 *     ApplicationUser:
 *       type: object
 *       description: Full field list ported from Enterprise.Models.ApplicationUser; see Audit/models/apiapplicationuser.model.js.
 *       properties:
 *         _id: { type: string }
 *         applicationId: { type: string }
 *         userId: { type: string }
 *         permission: { type: string }
 *         roleName: { type: string }
 *         accessType: { type: string }
 *         isActive: { type: boolean }
 * /api/applicationaccess/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all application access rows (port of 01GetAllApplicationAccess)
 *     tags: [ApplicationAccess]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create an application access row (port of 01CreateApplicationAccess)
 *     tags: [ApplicationAccess]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/ApplicationUser' } } } }
 *     responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/applicationaccess/application/{applicationId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get access rows for one application (port of 01GetApplicationAccessByApplication)
 *     tags: [ApplicationAccess]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/applicationaccess/user/{userId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get access rows for one user (port of 01GetApplicationAccessByUser)
 *     tags: [ApplicationAccess]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/applicationaccess/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get an application access row by id (port of 01GetApplicationAccessById)
 *     tags: [ApplicationAccess]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   put:
 *     summary: Update an application access row (port of 01UpdateApplicationAccess)
 *     tags: [ApplicationAccess]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/ApplicationUser' } } } }
 *     responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete an application access row (port of 01DeleteApplicationAccess)
 *     tags: [ApplicationAccess]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 204: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.get(secure("/application/:applicationId"), fusionAuth, controller.getByApplication);
credentialHint(router, GROUP, "GET", "/application/:applicationId");
router.get(secure("/user/:userId"), fusionAuth, controller.getByUser);
credentialHint(router, GROUP, "GET", "/user/:userId");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
