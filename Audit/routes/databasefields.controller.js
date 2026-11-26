// Audit/routes/databasefields.controller.js
// Route file shares the controller's exact base name per convention. Port of the endpoints mapped by
// analyticsgen4rev2/Audit/databasefields.controller.cs's MapDatabaseFieldsEndpoints, at the same base path
// ("/api/databasefields") and the same FusionAuth-secured shape (.../:apiusername/:apipassword/:token).
//
// Route order matters: the literal "/discovery" GET must be registered before the generic "/:id" GET, or
// Express would match a GET to ".../discovery/u/p/t" as "/:id" with id="discovery" instead.
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/databasefields.controller");

router.param("id", objectIdParam);

const GROUP = "/api/databasefields";

/**
 * @openapi
 * components:
 *   schemas:
 *     DatabaseField:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         databaseTableId: { type: string }
 *         tableName: { type: string }
 *         schemaName: { type: string }
 *         fieldName: { type: string }
 *         dataType: { type: string }
 *         clrType: { type: string }
 *         isNullable: { type: boolean }
 *         maxLength: { type: number }
 *         isPrimaryKey: { type: boolean }
 *         createdDate: { type: string, format: date-time }
 *         lastAuditDate: { type: string, format: date-time }
 *         isActive: { type: boolean }
 *         userList: { type: string }
 *         userDenyList: { type: string }
 */

/**
 * @openapi
 * /api/databasefields/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all database fields (port of IDatabaseFieldService29.GetAll29)
 *     tags: [DatabaseFields]
 *     parameters:
 *       - { in: path, name: apiusername, required: true, schema: { type: string } }
 *       - { in: path, name: apipassword, required: true, schema: { type: string } }
 *       - { in: path, name: token, required: true, schema: { type: string } }
 *     responses:
 *       200: { description: List of database fields }
 *       401: { description: FusionIdentity credential check failed }
 *   post:
 *     summary: Create a database field (port of IDatabaseFieldService29.Create29)
 *     tags: [DatabaseFields]
 *     parameters:
 *       - { in: path, name: apiusername, required: true, schema: { type: string } }
 *       - { in: path, name: apipassword, required: true, schema: { type: string } }
 *       - { in: path, name: token, required: true, schema: { type: string } }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/DatabaseField' }
 *     responses:
 *       201: { description: Created }
 *       401: { description: FusionIdentity credential check failed }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");

/**
 * @openapi
 * /api/databasefields/discovery/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Discovery metadata for this controller (port of IDatabaseFieldService29.GetDiscovery29)
 *     tags: [DatabaseFields]
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
 * /api/databasefields/table/{tableName}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all fields for one table (port of IDatabaseFieldService29.GetByTable29)
 *     tags: [DatabaseFields]
 *     parameters:
 *       - { in: path, name: tableName, required: true, schema: { type: string } }
 *       - { in: path, name: apiusername, required: true, schema: { type: string } }
 *       - { in: path, name: apipassword, required: true, schema: { type: string } }
 *       - { in: path, name: token, required: true, schema: { type: string } }
 *     responses:
 *       200: { description: Fields for that table }
 *       401: { description: FusionIdentity credential check failed }
 */
router.get(secure("/table/:tableName"), fusionAuth, controller.getByTable);
credentialHint(router, GROUP, "GET", "/table/:tableName");

/**
 * @openapi
 * /api/databasefields/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get a database field by id (port of IDatabaseFieldService29.GetById29)
 *     tags: [DatabaseFields]
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
 *     summary: Update a database field (port of IDatabaseFieldService29.Update29)
 *     tags: [DatabaseFields]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: string } }
 *       - { in: path, name: apiusername, required: true, schema: { type: string } }
 *       - { in: path, name: apipassword, required: true, schema: { type: string } }
 *       - { in: path, name: token, required: true, schema: { type: string } }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/DatabaseField' }
 *     responses:
 *       200: { description: Updated }
 *       404: { description: Not found }
 *       401: { description: FusionIdentity credential check failed }
 *   delete:
 *     summary: Delete a database field (port of IDatabaseFieldService29.Delete29)
 *     tags: [DatabaseFields]
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
