// Audit/routes/databaseservers.controllers.js — port of databaseservers.controllers.cs's MapDatabaseServerEndpoints,
// "/api/databaseservers".
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/databaseservers.controllers");

router.param("id", objectIdParam);
const GROUP = "/api/databaseservers";

/**
 * @openapi
 * components:
 *   schemas:
 *     DatabaseServer:
 *       type: object
 *       description: Full field list ported from Enterprise.Models.DatabaseServer; see Audit/models/databaseservers.models.js.
 *       properties:
 *         _id: { type: string }
 *         serverName: { type: string }
 *         hostname: { type: string }
 *         databasePlatform: { type: string }
 *         active: { type: boolean }
 * /api/databaseservers/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all database servers (port of IDatabaseServerService28.GetAll28)
 *     tags: [DatabaseServers]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create a database server (port of IDatabaseServerService28.Create28)
 *     tags: [DatabaseServers]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/DatabaseServer' } } } }
 *     responses: { 200: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/databaseservers/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get a database server by id (port of IDatabaseServerService28.GetById28)
 *     tags: [DatabaseServers]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   put:
 *     summary: Update a database server (port of IDatabaseServerService28.Update28)
 *     tags: [DatabaseServers]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/DatabaseServer' } } } }
 *     responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete a database server (port of IDatabaseServerService28.Delete28)
 *     tags: [DatabaseServers]
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
