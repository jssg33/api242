// Audit/routes/aiagents.controller.js — port of aiagents.controller.cs's MapAIAgentEndpoints, "/api/aiagents".
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/aiagents.controller");

router.param("id", objectIdParam);

const GROUP = "/api/aiagents";

/**
 * @openapi
 * components:
 *   schemas:
 *     AIAgent:
 *       type: object
 *       description: Full field list ported from Enterprise.Models.AIAgent; see Audit/models/aiagents.model.js.
 *       properties:
 *         _id: { type: string }
 *         agentName: { type: string }
 *         agentType: { type: string }
 *         instanceId: { type: string }
 *         status: { type: string }
 *         riskLevel: { type: string }
 * /api/aiagents/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all AI agents (port of IAIAgentService17.GetAll17)
 *     tags: [AIAgents]
 *     parameters:
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create an AI agent (port of IAIAgentService17.Create17)
 *     tags: [AIAgents]
 *     parameters:
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { $ref: '#/components/schemas/AIAgent' } } }
 *     responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/aiagents/active/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get active AI agents (port of IAIAgentService17.GetActive17)
 *     tags: [AIAgents]
 *     parameters:
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/aiagents/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get an AI agent by id, as a one-item array (port of IAIAgentService17.GetById17)
 *     tags: [AIAgents]
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   put:
 *     summary: Update an AI agent (port of IAIAgentService17.Update17)
 *     tags: [AIAgents]
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     requestBody:
 *       required: true
 *       content: { application/json: { schema: { $ref: '#/components/schemas/AIAgent' } } }
 *     responses: { 202: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete an AI agent (port of IAIAgentService17.Delete17)
 *     tags: [AIAgents]
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.get(secure("/active"), fusionAuth, controller.getActive);
credentialHint(router, GROUP, "GET", "/active");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
