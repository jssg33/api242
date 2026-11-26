// Audit/routes/webfarm.controller.js — port of webfarm.controller.cs's MapWebFarmEndpoints, "/api/webfarms".
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/webfarm.controller");

router.param("id", objectIdParam);
const GROUP = "/api/webfarms";

/**
 * @openapi
 * components:
 *   schemas:
 *     WebFarm:
 *       type: object
 *       description: Full field list ported from Enterprise.Models.WebFarm; see Audit/models/webfarm.model.js.
 *       properties:
 *         _id: { type: string }
 *         farmName: { type: string }
 *         loadBalancerName: { type: string }
 *         environment: { type: string }
 *         enabled: { type: boolean }
 * /api/webfarms/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all web farms (port of IWebFarmService25.GetAll25)
 *     tags: [WebFarms]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create a web farm (port of IWebFarmService25.Create25)
 *     tags: [WebFarms]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/WebFarm' } } } }
 *     responses: { 200: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/webfarms/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get a web farm by id (port of IWebFarmService25.GetById25)
 *     tags: [WebFarms]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   put:
 *     summary: Update a web farm (port of IWebFarmService25.Update25)
 *     tags: [WebFarms]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/WebFarm' } } } }
 *     responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete a web farm (port of IWebFarmService25.Delete25)
 *     tags: [WebFarms]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
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
