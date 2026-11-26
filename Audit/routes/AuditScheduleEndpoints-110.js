// Audit/routes/AuditScheduleEndpoints-110.js — port of AuditScheduleEndpoints-110.cs's
// MapAuditScheduleEndpoints, "/api/auditschedule". "/due/:runner" (literal-prefixed GET) is registered before
// the generic "/:id" GET.
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/AuditScheduleEndpoints-110");

router.param("id", objectIdParam);
const GROUP = "/api/auditschedule";

/**
 * @openapi
 * components:
 *   schemas:
 *     AuditSchedule:
 *       type: object
 *       description: Full field list ported from the AuditSchedule entity; see Audit/models/AuditScheduleEndpoints-110.model.js.
 *       properties:
 *         _id: { type: string }
 *         name: { type: string }
 *         apiHostId: { type: number }
 *         endpointGroup: { type: string }
 *         recurrence: { type: string, enum: [once, hourly, daily, weekly, monthly] }
 *         intervalCount: { type: number }
 *         startAt: { type: string, format: date-time }
 *         nextRunAt: { type: string, format: date-time }
 *         enabled: { type: boolean }
 *         runner: { type: string, enum: [any, browser, server] }
 *         status: { type: string }
 * /api/auditschedule/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Every schedule, next run first (port of IAuditScheduleService19.GetAll19)
 *     tags: [AuditSchedule]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 400: { description: Bad request } }
 *   post:
 *     summary: Add a schedule (port of IAuditScheduleService19.Create19)
 *     tags: [AuditSchedule]
 *     parameters: [$ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditSchedule' } } } }
 *     responses: { 200: { description: "{ success, id, nextRunAt }" }, 400: { description: Bad request } }
 * /api/auditschedule/due/{runner}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Enabled, due now, not claimed, for one runner kind (port of IAuditScheduleService19.GetDue19)
 *     tags: [AuditSchedule]
 *     parameters: [{ in: path, name: runner, required: true, schema: { type: string, enum: [browser, server] } }, $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 400: { description: Bad request } }
 * /api/auditschedule/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: One schedule, or [] when there is none (port of IAuditScheduleService19.GetById19)
 *     tags: [AuditSchedule]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: OK }, 400: { description: Bad request } }
 *   put:
 *     summary: Fields present in the body are copied, others left as they are (port of IAuditScheduleService19.Update19)
 *     tags: [AuditSchedule]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/AuditSchedule' } } } }
 *     responses: { 200: { description: "{ success, id, nextRunAt }" }, 404: { description: Not found }, 400: { description: Bad request } }
 *   delete:
 *     summary: Delete a schedule (port of IAuditScheduleService19.Delete19)
 *     tags: [AuditSchedule]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     responses: { 200: { description: Deleted }, 404: { description: Not found }, 400: { description: Bad request } }
 * /api/auditschedule/{id}/claim/{apiusername}/{apipassword}/{token}:
 *   post:
 *     summary: Atomically claim a due schedule for a run (port of IAuditScheduleService19.Claim19)
 *     tags: [AuditSchedule]
 *     parameters: [$ref: '#/components/parameters/MongoId', $ref: '#/components/parameters/FusionUsername', $ref: '#/components/parameters/FusionPassword', $ref: '#/components/parameters/FusionToken']
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: { type: object, properties: { claimedBy: { type: string }, kind: { type: string } } }
 *     responses:
 *       200: { description: "{ claimed: true, record }" }
 *       404: { description: Not found }
 *       409: { description: "{ claimed: false } — another runner already holds a fresh claim" }
 */
router.get(secure("/"), fusionAuth, controller.getAll);
credentialHint(router, GROUP, "GET", "/");
router.post(secure("/"), fusionAuth, controller.create);
credentialHint(router, GROUP, "POST", "/");
router.get(secure("/due/:runner"), fusionAuth, controller.getDue);
credentialHint(router, GROUP, "GET", "/due/:runner");
router.post(secure("/:id/claim"), fusionAuth, controller.claim);
credentialHint(router, GROUP, "POST", "/:id/claim");
router.get(secure("/:id"), fusionAuth, controller.getById);
credentialHint(router, GROUP, "GET", "/:id");
router.put(secure("/:id"), fusionAuth, controller.update);
credentialHint(router, GROUP, "PUT", "/:id");
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
