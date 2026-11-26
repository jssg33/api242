// Audit/routes/auditorinstance.controller.js — port of auditorinstance.controller.cs's
// MapAuditorInstanceEndpoints, "/api/auditorinstances".
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/auditorinstance.controller");

router.param("id", objectIdParam);
const GROUP = "/api/auditorinstances";

/**
 * @openapi
 * components:
 *   schemas:
 *     AuditorInstance:
 *       type: object
 *       description: Full field list ported from Enterprise.Models.AuditorInstance; see Audit/models/auditorinstance.model.js.
 *       properties:
 *         _id: { type: string }
 *         siteId: { type: string }
 *         region: { type: string }
 *         country: { type: string }
 *         status: { type: string }
 * /api/auditorinstances/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all auditor instances (port of IAuditorInstanceService10.GetAll10)
 *     tags: [AuditorInstances]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create an auditor instance (port of IAuditorInstanceService10.Create10)
 *     tags: [AuditorInstances]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditorInstance' } } } }
 *     responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/auditorinstances/site/{siteId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get auditor instances for one site (port of IAuditorInstanceService10.GetBySite10)
 *     tags: [AuditorInstances]
 *     parameters: [{ in: path, name: siteId, required: true, schema: { type: string } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/auditorinstances/region/{region}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get auditor instances for one region (port of IAuditorInstanceService10.GetByRegion10)
 *     tags: [AuditorInstances]
 *     parameters: [{ in: path, name: region, required: true, schema: { type: string } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/auditorinstances/{id}/{apiusername}/{apipassword}/{token}:
 *   put:
 *     summary: Update an auditor instance (port of IAuditorInstanceService10.Update10)
 *     tags: [AuditorInstances]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditorInstance' } } } }
 *     responses: { 202: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete an auditor instance (port of IAuditorInstanceService10.Delete10)
 *     tags: [AuditorInstances]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.get(secure("/site/:siteId"), fusionAuth, controller.getBySite);
credentialHint(router, GROUP, "GET", "/site/:siteId");
router.get(secure("/region/:region"), fusionAuth, controller.getByRegion);
credentialHint(router, GROUP, "GET", "/region/:region");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
