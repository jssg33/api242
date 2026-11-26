// Audit/routes/databases.controller.js — port of databases.controller.cs's MapDatabaseEndpoints, "/api/databases".
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/databases.controller");

router.param("id", objectIdParam);
const GROUP = "/api/databases";

/**
 * @openapi
 * components:
 *   schemas:
 *     Database:
 *       type: object
 *       description: Full field list ported from Enterprise.Models.Database; see Audit/models/databases.model.js.
 *       properties:
 *         _id: { type: string }
 *         databaseName: { type: string }
 *         databaseServerId: { type: number }
 *         databaseType: { type: string }
 *         active: { type: boolean }
 * /api/databases/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all databases (port of IDatabaseService20.GetAll20)
 *     tags: [Databases]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create a database (port of IDatabaseService20.Create20)
 *     tags: [Databases]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/Database' } } } }
 *     responses: { 200: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/databases/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get a database by id (port of IDatabaseService20.GetById20)
 *     tags: [Databases]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   put:
 *     summary: Update a database (port of IDatabaseService20.Update20)
 *     tags: [Databases]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/Database' } } } }
 *     responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete a database (port of IDatabaseService20.Delete20)
 *     tags: [Databases]
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
