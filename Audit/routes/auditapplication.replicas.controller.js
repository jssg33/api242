// Audit/routes/auditapplication.replicas.controller.js — port of auditapplication.replicas.controller.cs's
// MapAuditApplicationReplicas, "/AuditApplicationReplicas" (no "/api" prefix in the C# source either).
const express = require("express");
const router = express.Router();
const { objectIdParam, numberParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/auditapplication.replicas.controller");

router.param("id", objectIdParam);
router.param("applicationId", numberParam);

const GROUP = "/AuditApplicationReplicas";

/**
 * @openapi
 * components:
 *   schemas:
 *     AuditApplicationReplica:
 *       type: object
 *       description: Full field list ported from Enterprise.Models.AuditApplicationReplica; see Audit/models/auditapplication.replica.model.js.
 *       properties:
 *         _id: { type: string }
 *         auditApplicationId: { type: number }
 *         replicaName: { type: string }
 *         shardId: { type: string }
 *         region: { type: string }
 *         status: { type: string }
 *         isActive: { type: boolean }
 * /AuditApplicationReplicas/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all application replicas (port of AuditApplicationReplicas.GetAll)
 *     tags: [AuditApplicationReplicas]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create an application replica (port of AuditApplicationReplicas.Create)
 *     tags: [AuditApplicationReplicas]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditApplicationReplica' } } } }
 *     responses: { 200: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /AuditApplicationReplicas/Application/{applicationId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Replicas for one application (port of AuditApplicationReplicas.GetByApplication)
 *     tags: [AuditApplicationReplicas]
 *     parameters: [{ in: path, name: applicationId, required: true, schema: { type: integer } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /AuditApplicationReplicas/Shard/{shardId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Replicas for one shard (port of AuditApplicationReplicas.GetByShard)
 *     tags: [AuditApplicationReplicas]
 *     parameters: [{ in: path, name: shardId, required: true, schema: { type: string } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /AuditApplicationReplicas/Region/{region}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Replicas for one region (port of AuditApplicationReplicas.GetByRegion)
 *     tags: [AuditApplicationReplicas]
 *     parameters: [{ in: path, name: region, required: true, schema: { type: string } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /AuditApplicationReplicas/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get an application replica by id (port of AuditApplicationReplicas.GetById)
 *     tags: [AuditApplicationReplicas]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   put:
 *     summary: Update an application replica (port of AuditApplicationReplicas.Update)
 *     tags: [AuditApplicationReplicas]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditApplicationReplica' } } } }
 *     responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete an application replica (port of AuditApplicationReplicas.Delete)
 *     tags: [AuditApplicationReplicas]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.get(secure("/Application/:applicationId"), fusionAuth, controller.getByApplication);
credentialHint(router, GROUP, "GET", "/Application/:applicationId");
router.get(secure("/Shard/:shardId"), fusionAuth, controller.getByShard);
credentialHint(router, GROUP, "GET", "/Shard/:shardId");
router.get(secure("/Region/:region"), fusionAuth, controller.getByRegion);
credentialHint(router, GROUP, "GET", "/Region/:region");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
