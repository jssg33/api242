// Audit/routes/apiapplicationapi.controller.js — port of apiapplicationapi.controller.cs's
// MapApplicationApiEndpoints, "/api/ApplicationApi".
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/apiapplicationapi.controller");

router.param("id", objectIdParam);
router.param("applicationId", objectIdParam);
router.param("apiHostId", objectIdParam);

const GROUP = "/api/ApplicationApi";

/**
 * @openapi
 * components:
 *   schemas:
 *     ApplicationApi:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         applicationId: { type: string }
 *         databaseId: { type: string }
 *         apiHostId: { type: string }
 *         createdDate: { type: string, format: date-time }
 * /api/ApplicationApi/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all application/host links (port of IApplicationApiService16.GetAll16)
 *     tags: [ApplicationApi]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create an application/host link (port of IApplicationApiService16.Create16)
 *     tags: [ApplicationApi]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/ApplicationApi' } } } }
 *     responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/ApplicationApi/application/{applicationId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get links for one application (port of IApplicationApiService16.GetByApplication16)
 *     tags: [ApplicationApi]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/ApplicationApi/host/{apiHostId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get links for one API host (port of IApplicationApiService16.GetByHost16)
 *     tags: [ApplicationApi]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/ApplicationApi/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get a link by id (port of IApplicationApiService16.GetById16)
 *     tags: [ApplicationApi]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   put:
 *     summary: Update a link (port of IApplicationApiService16.Update16)
 *     tags: [ApplicationApi]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/ApplicationApi' } } } }
 *     responses: { 202: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete a link (port of IApplicationApiService16.Delete16)
 *     tags: [ApplicationApi]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 202: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.get(secure("/application/:applicationId"), fusionAuth, controller.getByApplication);
credentialHint(router, GROUP, "GET", "/application/:applicationId");
router.get(secure("/host/:apiHostId"), fusionAuth, controller.getByHost);
credentialHint(router, GROUP, "GET", "/host/:apiHostId");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
