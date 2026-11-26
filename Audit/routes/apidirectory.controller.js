// Audit/routes/apidirectory.controller.js — port of apidirectory.controller.cs's MapApiDirectoryEndpoints,
// "/api/app/directory". Unlike every other Audit controller, the C# source mounts BOTH an unsecured variant of
// each route (its original build) AND a FusionAuth-secured "/.../:apiusername/:apipassword/:token" variant
// added later (Build 104) — neither replaces the other, so both are kept here too.
// "/list" (literal GET) must be registered before the generic "/:id" GET.
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth } = require("../../middleware/fusionAuth");
const controller = require("../controllers/apidirectory.controller");

router.param("id", objectIdParam);
router.param("applicationId", objectIdParam);
router.param("directoryId", objectIdParam);

/**
 * @openapi
 * components:
 *   schemas:
 *     ApiDirectory:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         tenantId: { type: string }
 *         tenantName: { type: string }
 *         domainName: { type: string }
 *         isDefault: { type: boolean }
 *         isDeleted: { type: boolean }
 * /api/app/directory/list:
 *   get:
 *     summary: Non-deleted directories, alphabetical, unsecured (port of IApiDirectoryService13.GetAll13)
 *     tags: [ApiDirectory]
 *     responses: { 200: { description: OK } }
 * /api/app/directory/list/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Same as above, FusionAuth-secured (port of IApiDirectoryService13.GetAll13.WithToken)
 *     tags: [ApiDirectory]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/app/directory/create:
 *   post:
 *     summary: Create a directory, unsecured (port of IApiDirectoryService13.Create13)
 *     tags: [ApiDirectory]
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/ApiDirectory' } } } }
 *     responses: { 200: { description: Created } }
 * /api/app/directory/create/{apiusername}/{apipassword}/{token}:
 *   post:
 *     summary: Same as above, FusionAuth-secured (port of IApiDirectoryService13.Create13.WithToken)
 *     tags: [ApiDirectory]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/ApiDirectory' } } } }
 *     responses: { 200: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/app/directory/sync/{applicationId}:
 *   post:
 *     summary: Register the Application in Entra via this directory's tenant, unsecured (port of IApiDirectoryService13.SyncApplication13; 501, see controller)
 *     tags: [ApiDirectory]
 *     parameters: [$ref: '#/components/parameters/MongoId']
 *     responses: { 501: { description: Not implemented — needs the Microsoft Graph SDK } }
 * /api/app/directory/sync/{applicationId}/{apiusername}/{apipassword}/{token}:
 *   post:
 *     summary: Same as above, FusionAuth-secured (port of IApiDirectoryService13.SyncApplication13.WithToken)
 *     tags: [ApiDirectory]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 501: { description: Not implemented — needs the Microsoft Graph SDK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/app/directory/applications/{directoryId}:
 *   get:
 *     summary: Entra applications registered under this directory's tenant, unsecured (port of IApiDirectoryService13.GetDirectoryApplications13; 501, see controller)
 *     tags: [ApiDirectory]
 *     parameters: [$ref: '#/components/parameters/MongoId']
 *     responses: { 501: { description: Not implemented — needs the Microsoft Graph SDK } }
 * /api/app/directory/applications/{directoryId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Same as above, FusionAuth-secured (port of IApiDirectoryService13.GetDirectoryApplications13.WithToken)
 *     tags: [ApiDirectory]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 501: { description: Not implemented — needs the Microsoft Graph SDK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/app/directory/{id}:
 *   get:
 *     summary: Get a directory by id, unsecured (port of IApiDirectoryService13.GetById13)
 *     tags: [ApiDirectory]
 *     parameters: [$ref: '#/components/parameters/MongoId']
 *     responses: { 200: { description: OK }, 404: { description: Not found } }
 *   delete:
 *     summary: Soft-delete a directory, unsecured (port of IApiDirectoryService13.Delete13)
 *     tags: [ApiDirectory]
 *     parameters: [$ref: '#/components/parameters/MongoId']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found } }
 * /api/app/directory/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Same as GET /{id}, FusionAuth-secured (port of IApiDirectoryService13.GetById13.WithToken)
 *     tags: [ApiDirectory]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Same as DELETE /{id}, FusionAuth-secured (port of IApiDirectoryService13.Delete13.WithToken)
 *     tags: [ApiDirectory]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get("/list", controller.list);
router.get("/list/:apiusername/:apipassword/:token", fusionAuth, controller.list);

router.post("/create", controller.create);
router.post("/create/:apiusername/:apipassword/:token", fusionAuth, controller.create);

router.post("/sync/:applicationId", controller.syncApplication);
router.post("/sync/:applicationId/:apiusername/:apipassword/:token", fusionAuth, controller.syncApplication);

router.get("/applications/:directoryId", controller.getDirectoryApplications);
router.get("/applications/:directoryId/:apiusername/:apipassword/:token", fusionAuth, controller.getDirectoryApplications);

router.get("/:id", controller.get);
router.get("/:id/:apiusername/:apipassword/:token", fusionAuth, controller.get);
router.delete("/:id", controller.remove);
router.delete("/:id/:apiusername/:apipassword/:token", fusionAuth, controller.remove);

module.exports = router;
