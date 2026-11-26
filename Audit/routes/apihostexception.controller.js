// Audit/routes/apihostexception.controller.js — port of apihostexception.controller.cs's
// MapApiHostExceptionEndpoints, "/api/ApiHostException".
const express = require("express");
const router = express.Router();
const { objectIdParam, numberParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/apihostexception.controller");

router.param("id", objectIdParam);
router.param("apiHostId", numberParam);

const GROUP = "/api/ApiHostException";

/**
 * @openapi
 * components:
 *   schemas:
 *     ApiHostException:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         apiHostId: { type: number }
 *         exceptionType: { type: string }
 *         reason: { type: string }
 *         approvedBy: { type: string }
 *         approvalDate: { type: string, format: date-time }
 *         expirationDate: { type: string, format: date-time }
 *         active: { type: boolean }
 *         notes: { type: string }
 *         createdDate: { type: string, format: date-time }
 * /api/ApiHostException/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all host exceptions (port of IApiHostExceptionService12.GetAll12)
 *     tags: [ApiHostException]
 *     parameters:
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create a host exception (port of IApiHostExceptionService12.Create12)
 *     tags: [ApiHostException]
 *     parameters:
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { $ref: '#/components/schemas/ApiHostException' } } }
 *     responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/ApiHostException/host/{apiHostId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get host exceptions for one API host (port of IApiHostExceptionService12.GetByHost12)
 *     tags: [ApiHostException]
 *     parameters:
 *       - { in: path, name: apiHostId, required: true, schema: { type: integer } }
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/ApiHostException/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get a host exception by id (port of IApiHostExceptionService12.GetById12)
 *     tags: [ApiHostException]
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   put:
 *     summary: Update a host exception (port of IApiHostExceptionService12.Update12)
 *     tags: [ApiHostException]
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { $ref: '#/components/schemas/ApiHostException' } } }
 *     responses: { 202: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete a host exception (port of IApiHostExceptionService12.Delete12)
 *     tags: [ApiHostException]
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses: { 202: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.get(secure("/host/:apiHostId"), fusionAuth, controller.getByHost);
credentialHint(router, GROUP, "GET", "/host/:apiHostId");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
