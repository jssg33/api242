// Audit/routes/trafficrouters.controller.js — port of trafficrouters.controller.cs's MapTrafficRouterEndpoints,
// "/api/trafficrouters". The C# source builds each secured path manually (no MapGroup/FusionAuth.Secure helper)
// and defines no 1002 credential-hint routes — so, uniquely among the Audit routes, this file skips
// credentialHint too; fusionAuth itself is still applied for the same credential check.
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure } = require("../../middleware/fusionAuth");
const controller = require("../controllers/trafficrouters.controller");

router.param("id", objectIdParam);
router.param("routerId", objectIdParam);
router.param("hostId", objectIdParam);

/**
 * @openapi
 * components:
 *   schemas:
 *     TrafficRouter:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         routerName: { type: string }
 *         routerType: { type: string }
 *         routingMethod: { type: string }
 *         isEnabled: { type: boolean }
 * /api/trafficrouters/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all traffic routers (port of ITrafficRouterService24.GetAll24)
 *     tags: [TrafficRouters]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create a traffic router (port of ITrafficRouterService24.Create24)
 *     tags: [TrafficRouters]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/TrafficRouter' } } } }
 *     responses: { 200: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/trafficrouters/assignhost/{routerId}/{hostId}/{apiusername}/{apipassword}/{token}:
 *   post:
 *     summary: Point an API host at this router (port of ITrafficRouterService24.AssignHost24)
 *     tags: [TrafficRouters]
 *     parameters: [$ref: '#/components/parameters/MongoId', { in: path, name: hostId, required: true, schema: { type: string } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/trafficrouters/removehost/{hostId}/{apiusername}/{apipassword}/{token}:
 *   post:
 *     summary: Clear an API host's router (port of ITrafficRouterService24.RemoveHost24)
 *     tags: [TrafficRouters]
 *     parameters: [{ in: path, name: hostId, required: true, schema: { type: string } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/trafficrouters/apihosts/{routerId}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: API hosts pointed at this router (port of ITrafficRouterService24.GetApiHosts24)
 *     tags: [TrafficRouters]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/trafficrouters/{id}/hosts/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: One router plus its hosts (port of ITrafficRouterService24.GetHostsForRouter24)
 *     tags: [TrafficRouters]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/trafficrouters/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get a traffic router by id (port of ITrafficRouterService24.GetById24)
 *     tags: [TrafficRouters]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   put:
 *     summary: Update a traffic router (port of ITrafficRouterService24.Update24)
 *     tags: [TrafficRouters]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/TrafficRouter' } } } }
 *     responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete a traffic router (port of ITrafficRouterService24.Delete24)
 *     tags: [TrafficRouters]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
router.post(secure("/"), fusionAuth, controller.create);
router.post(secure("/assignhost/:routerId/:hostId"), fusionAuth, controller.assignHost);
router.post(secure("/removehost/:hostId"), fusionAuth, controller.removeHost);
router.get(secure("/apihosts/:routerId"), fusionAuth, controller.getApiHosts);
router.get(secure("/:id/hosts"), fusionAuth, controller.getHostsForRouter);
router.get(secure("/:id"), fusionAuth, controller.getById);
router.put(secure("/:id"), fusionAuth, controller.update);
router.delete(secure("/:id"), fusionAuth, controller.remove);

module.exports = router;
