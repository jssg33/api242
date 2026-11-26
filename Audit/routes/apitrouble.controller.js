// Audit/routes/apitrouble.controller.js — port of apitrouble.controller.cs's MapWorkerTroubleTicketEndpoints,
// "/api/WorkerTroubleTickets". "/open" and "/harddown" (literal GETs) are registered before the generic "/:id" GET.
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/apitrouble.controller");

router.param("id", objectIdParam);
const GROUP = "/api/WorkerTroubleTickets";

/**
 * @openapi
 * components:
 *   schemas:
 *     WorkerTroubleTicket:
 *       type: object
 *       description: Full field list ported from Enterprise.Models.WorkerTroubleTicket; see Audit/models/apiaudittrouble.js.
 *       properties:
 *         _id: { type: string }
 *         ticketNumber: { type: string }
 *         apiName: { type: string }
 *         status: { type: string }
 *         severity: { type: string }
 *         isHardDown: { type: boolean }
 * /api/WorkerTroubleTickets/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all trouble tickets, newest first (port of GetWorkerTroubleTickets)
 *     tags: [WorkerTroubleTickets]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   post:
 *     summary: Create a trouble ticket (port of CreateWorkerTroubleTicket)
 *     tags: [WorkerTroubleTickets]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/WorkerTroubleTicket' } } } }
 *     responses: { 201: { description: Created }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/WorkerTroubleTickets/open/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get open trouble tickets (port of GetOpenWorkerTroubleTickets)
 *     tags: [WorkerTroubleTickets]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/WorkerTroubleTickets/harddown/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get hard-down trouble tickets (port of GetHardDownWorkerTroubleTickets)
 *     tags: [WorkerTroubleTickets]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/WorkerTroubleTickets/{id}/resolve/{apiusername}/{apipassword}/{token}:
 *   put:
 *     summary: Mark a trouble ticket resolved (port of ResolveWorkerTroubleTicket)
 *     tags: [WorkerTroubleTickets]
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *       - { in: query, name: resolutionNotes, schema: { type: string } }
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 * /api/WorkerTroubleTickets/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get a trouble ticket by id (port of GetWorkerTroubleTicket)
 *     tags: [WorkerTroubleTickets]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   put:
 *     summary: Update a trouble ticket (port of UpdateWorkerTroubleTicket)
 *     tags: [WorkerTroubleTickets]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/WorkerTroubleTicket' } } } }
 *     responses: { 200: { description: Updated }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 *   delete:
 *     summary: Delete a trouble ticket (port of DeleteWorkerTroubleTicket)
 *     tags: [WorkerTroubleTickets]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 401: { $ref: '#/components/responses/FusionUnauthorized' } }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.get(secure("/open"), fusionAuth, controller.getOpen);
credentialHint(router, GROUP, "GET", "/open");
router.get(secure("/harddown"), fusionAuth, controller.getHardDown);
credentialHint(router, GROUP, "GET", "/harddown");
router.put(secure("/:id/resolve"), fusionAuth, controller.resolve);
credentialHint(router, GROUP, "PUT", "/:id/resolve");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
