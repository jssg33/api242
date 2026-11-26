// Audit/routes/apiauditcontroller.js
// Port of analyticsgen4rev2/Audit/apiauditcontroller.cs's MapApiAuditEndpoints, at "/api/Apiaudit",
// FusionAuth-secured.
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/apiauditcontroller");

router.param("id", objectIdParam);

const GROUP = "/api/Apiaudit";

/**
 * @openapi
 * components:
 *   schemas:
 *     Apiaudit:
 *       type: object
 *       description: Full field list ported from Enterprise.Models.Apiaudit; see Audit/models/apiaudit.model.js.
 *       properties:
 *         _id: { type: string }
 *         auditorId: { type: number }
 *         description: { type: string }
 *         url: { type: string }
 *         apiRoot: { type: string }
 *         lastStatusCode: { type: number }
 *         lastResponseMs: { type: number }
 *         lastAuditDate: { type: string, format: date-time }
 *         isActive: { type: boolean }
 * /api/Apiaudit/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all audited endpoints (port of IApiauditService04.GetAll04)
 *     tags: [Apiaudit]
 *     parameters:
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses:
 *       200: { description: OK }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
 *   post:
 *     summary: Create an audited endpoint; also writes an ApiauditRunHistory row (port of IApiauditService04.Create04)
 *     tags: [Apiaudit]
 *     parameters:
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Apiaudit' }
 *     responses:
 *       201: { description: Created }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
 * /api/Apiaudit/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get an audited endpoint by id, as a one-item array (port of IApiauditService04.GetById04)
 *     tags: [Apiaudit]
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses:
 *       200: { description: OK }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
 *   put:
 *     summary: Update an audited endpoint; also writes an ApiauditRunHistory row (port of IApiauditService04.Update04)
 *     tags: [Apiaudit]
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Apiaudit' }
 *     responses:
 *       202: { description: Updated }
 *       404: { description: Not found }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
 *   delete:
 *     summary: Delete an audited endpoint (port of IApiauditService04.Delete04)
 *     tags: [Apiaudit]
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses:
 *       200: { description: Deleted }
 *       404: { description: Not found }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
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
