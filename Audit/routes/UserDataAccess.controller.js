// Audit/routes/UserDataAccess.controller.js — port of UserDataAccess.controller.cs's MapUserDataAccessEndpoints,
// "/api/UserDataAccess".
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/UserDataAccess.controller");

router.param("id", objectIdParam);
const GROUP = "/api/UserDataAccess";

/**
 * @openapi
 * components:
 *   schemas:
 *     UserDataAccess:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         userId: { type: number }
 *         databaseName: { type: string }
 *         tableName: { type: string }
 *         fieldName: { type: string }
 *         canRead: { type: boolean }
 *         canWrite: { type: boolean }
 *         isActive: { type: boolean }
 *         grantedBy: { type: string }
 * /api/UserDataAccess/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Every data-access grant (port of IUserDataAccessService21.GetAll21)
 *     tags: [UserDataAccess]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 400: { description: Bad request } }
 *   post:
 *     summary: Add a data-access grant (port of IUserDataAccessService21.Create21)
 *     tags: [UserDataAccess]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/UserDataAccess' } } } }
 *     responses: { 200: { description: "{ success, id }" }, 400: { description: Bad request } }
 * /api/UserDataAccess/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: One grant, or [] when there is none (port of IUserDataAccessService21.GetById21)
 *     tags: [UserDataAccess]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 400: { description: Bad request } }
 *   put:
 *     summary: A field in the body is copied; a field left out is left as it is (port of IUserDataAccessService21.Update21)
 *     tags: [UserDataAccess]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/UserDataAccess' } } } }
 *     responses: { 200: { description: "{ success, id }" }, 404: { description: Not found }, 400: { description: Bad request } }
 *   delete:
 *     summary: Delete a data-access grant (port of IUserDataAccessService21.Delete21)
 *     tags: [UserDataAccess]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 400: { description: Bad request } }
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
