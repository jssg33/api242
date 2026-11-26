// Audit/routes/AuditConfigEndpoints-110.js — port of AuditConfigEndpoints-110.cs's MapAuditConfigEndpoints,
// "/api/auditconfig". "/shard/:region/:shard" (2-segment literal-prefixed GET) has no collision with the
// generic "/:id" GET (different segment count), so no ordering concern there.
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/AuditConfigEndpoints-110");

router.param("id", objectIdParam);
const GROUP = "/api/auditconfig";

/**
 * @openapi
 * components:
 *   schemas:
 *     AuditConfig:
 *       type: object
 *       description: The network-map grid cell for one auditor instance (Region/Shard/Instance); see Audit/models/AuditConfigEndpoints-110.model.js.
 *       properties:
 *         _id: { type: string }
 *         description: { type: string }
 *         region: { type: string }
 *         shard: { type: string }
 *         instance: { type: string }
 *         root1: { type: string }
 *         root2: { type: string }
 *         ipv4: { type: string }
 *         ipv6: { type: string }
 *         ipv42: { type: string }
 *         ipv62: { type: string }
 * /api/auditconfig/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Every auditor, by Region, Shard, Instance (port of IAuditConfigService18.GetAll18)
 *     tags: [AuditConfig]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 400: { description: Bad request } }
 *   post:
 *     summary: Add an auditor config row (port of IAuditConfigService18.Create18)
 *     tags: [AuditConfig]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditConfig' } } } }
 *     responses: { 200: { description: "{ success, id }" }, 400: { description: Bad request } }
 * /api/auditconfig/shard/{region}/{shard}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: One grid cell — the auditors that are peers (port of IAuditConfigService18.GetShard18)
 *     tags: [AuditConfig]
 *     parameters: [{ in: path, name: region, required: true, schema: { type: string } }, { in: path, name: shard, required: true, schema: { type: string } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 400: { description: Bad request } }
 * /api/auditconfig/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: One record, or [] when there is none (port of IAuditConfigService18.GetById18)
 *     tags: [AuditConfig]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 400: { description: Bad request } }
 *   put:
 *     summary: Fields in the body are copied, others left as they are (port of IAuditConfigService18.Update18)
 *     tags: [AuditConfig]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditConfig' } } } }
 *     responses: { 200: { description: "{ success, id }" }, 404: { description: Not found }, 400: { description: Bad request (incl. field too long) } }
 *   delete:
 *     summary: Delete an auditor config row (port of IAuditConfigService18.Delete18)
 *     tags: [AuditConfig]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 400: { description: Bad request } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.get(secure("/shard/:region/:shard"), fusionAuth, controller.getShard);
credentialHint(router, GROUP, "GET", "/shard/:region/:shard");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
