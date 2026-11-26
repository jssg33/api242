// Audit/routes/apiapplication.controller.js — port of apiapplication.controller.cs's MapApplicationEndpoints,
// "/api/Application".
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/apiapplication.controller");

router.param("id", objectIdParam);

const GROUP = "/api/Application";

/**
 * @openapi
 * components:
 *   schemas:
 *     Application:
 *       type: object
 *       description: Full field list ported from Enterprise.Models.Application; see Audit/models/apiapplications.model.js.
 *       properties:
 *         _id: { type: string }
 *         applicationName: { type: string }
 *         description: { type: string }
 *         environment: { type: string }
 *         isActive: { type: boolean }
 * /api/Application/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all applications (port of IApplicationService05.GetAll05)
 *     tags: [Application]
 *     parameters:
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create an application (port of IApplicationService05.Create05)
 *     tags: [Application]
 *     parameters:
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { $ref: '#/components/schemas/Application' } } }
 *     responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/Application/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get an application by id (port of IApplicationService05.GetById05)
 *     tags: [Application]
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   put:
 *     summary: Update an application (port of IApplicationService05.Update05)
 *     tags: [Application]
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { $ref: '#/components/schemas/Application' } } }
 *     responses: { 202: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete an application (port of IApplicationService05.Delete05)
 *     tags: [Application]
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses: { 202: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/Application/{id}/Apis/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Apihosts linked to this application via ApplicationApi (port of IApplicationService05.GetApplicationApis05)
 *     tags: [Application]
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.get(secure("/:id/Apis"), fusionAuth, controller.getApplicationApis);
credentialHint(router, GROUP, "GET", "/:id/Apis");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
