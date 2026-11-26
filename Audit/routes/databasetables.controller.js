// Audit/routes/databasetables.controller.js
// Route file shares the controller's exact base name per convention. Port of the endpoints mapped by
// analyticsgen4rev2/Audit/databasetables.controller.cs's MapDatabaseTablesEndpoints, at the same base path
// ("/api/databasetables") and the same FusionAuth-secured shape (.../:apiusername/:apipassword/:token).
//
// Route order matters: the literal "/discovery" path must be registered before the generic "/:id" path, or
// Express would match a GET to ".../discovery/u/p/t" as "/:id" with id="discovery" instead.
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/databasetables.controller");

router.param("id", objectIdParam);

const GROUP = "/api/databasetables";

/**
 * @openapi
 * components:
 *   schemas:
 *     DatabaseTable:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         tableName: { type: string }
 *         schemaName: { type: string }
 *         modelName: { type: string }
 *         columnCount: { type: number }
 *         createdDate: { type: string, format: date-time }
 *         lastAuditDate: { type: string, format: date-time }
 *         isActive: { type: boolean }
 *         schemaArea: { type: string }
 *         userList: { type: string }
 *         userDenyList: { type: string }
 */

/**
 * @openapi
 * /api/databasetables/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all database tables (port of IDatabaseTableService08.GetAll08)
 *     tags: [DatabaseTables]
 *     parameters:
 *       - { in: path, name: apiusername, required: true, schema: { type: string } }
 *       - { in: path, name: apipassword, required: true, schema: { type: string } }
 *       - { in: path, name: token, required: true, schema: { type: string } }
 *     responses:
 *       200: { description: List of database tables }
 *       401: { description: FusionIdentity credential check failed }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");

/**
 * @openapi
 * /api/databasetables/discover/{apiusername}/{apipassword}/{token}:
 *   post:
 *     summary: Discover Mongoose models/collections and upsert DatabaseTables rows (port of IDatabaseTableService08.Discover08)
 *     tags: [DatabaseTables]
 *     parameters:
 *       - { in: path, name: apiusername, required: true, schema: { type: string } }
 *       - { in: path, name: apipassword, required: true, schema: { type: string } }
 *       - { in: path, name: token, required: true, schema: { type: string } }
 *     responses:
 *       200: { description: Discovery summary }
 *       401: { description: FusionIdentity credential check failed }
 */
router.post(secure("/discover"), fusionAuth, controller.discover);
credentialHint(router, GROUP, "POST", "/discover");

/**
 * @openapi
 * /api/databasetables/discovery/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Discovery metadata for this controller (port of IDatabaseTableService08.GetDiscovery08)
 *     tags: [DatabaseTables]
 *     parameters:
 *       - { in: path, name: apiusername, required: true, schema: { type: string } }
 *       - { in: path, name: apipassword, required: true, schema: { type: string } }
 *       - { in: path, name: token, required: true, schema: { type: string } }
 *     responses:
 *       200: { description: Discovery info }
 *       401: { description: FusionIdentity credential check failed }
 */
router.get(secure("/discovery"), fusionAuth, controller.discoveryInfo);
credentialHint(router, GROUP, "GET", "/discovery");

/**
 * @openapi
 * /api/databasetables/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get a database table by id (port of IDatabaseTableService08.GetById08)
 *     tags: [DatabaseTables]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string } }
 *       - { in: path, name: apiusername, required: true, schema: { type: string } }
 *       - { in: path, name: apipassword, required: true, schema: { type: string } }
 *       - { in: path, name: token, required: true, schema: { type: string } }
 *     responses:
 *       200: { description: Found }
 *       404: { description: Not found }
 *       401: { description: FusionIdentity credential check failed }
 *   put:
 *     summary: Update a database table (port of IDatabaseTableService08.Update08)
 *     tags: [DatabaseTables]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string } }
 *       - { in: path, name: apiusername, required: true, schema: { type: string } }
 *       - { in: path, name: apipassword, required: true, schema: { type: string } }
 *       - { in: path, name: token, required: true, schema: { type: string } }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/DatabaseTable' }
 *     responses:
 *       200: { description: Updated }
 *       404: { description: Not found }
 *       401: { description: FusionIdentity credential check failed }
 *   delete:
 *     summary: Delete a database table (port of IDatabaseTableService08.Delete08)
 *     tags: [DatabaseTables]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string } }
 *       - { in: path, name: apiusername, required: true, schema: { type: string } }
 *       - { in: path, name: apipassword, required: true, schema: { type: string } }
 *       - { in: path, name: token, required: true, schema: { type: string } }
 *     responses:
 *       200: { description: Deleted }
 *       404: { description: Not found }
 *       401: { description: FusionIdentity credential check failed }
 */
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
