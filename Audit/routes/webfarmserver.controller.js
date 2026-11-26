// Audit/routes/webfarmserver.controller.js
// Port of the endpoints mapped by analyticsgen4rev2/Audit/webfarmserver.controller.cs's
// MapWebFarmServerEndpoints, at "/api/webfarmservers", FusionAuth-secured.
const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../../middleware/validateParams");
const { fusionAuth, secure, credentialHint } = require("../../middleware/fusionAuth");
const controller = require("../controllers/webfarmserver.controller");

router.param("id", objectIdParam);

const GROUP = "/api/webfarmservers";

/**
 * @openapi
 * components:
 *   schemas:
 *     WebFarmServer:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         webFarmId: { type: number }
 *         webServerId: { type: number }
 * /api/webfarmservers/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get all web farm servers (port of IWebFarmServerService23.GetAll23)
 *     tags: [WebFarmServers]
 *     parameters:
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses:
 *       200: { description: OK }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
 *   post:
 *     summary: Create a web farm server (port of IWebFarmServerService23.Create23)
 *     tags: [WebFarmServers]
 *     parameters:
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/WebFarmServer' }
 *     responses:
 *       200: { description: Created }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
 * /api/webfarmservers/{id}/{apiusername}/{apipassword}/{token}:
 *   get:
 *     summary: Get a web farm server by id (port of IWebFarmServerService23.GetById23)
 *     tags: [WebFarmServers]
 *     parameters:
 *       - $ref: '#/components/parameters/MongoId'
 *       - $ref: '#/components/parameters/FusionUsername'
 *       - $ref: '#/components/parameters/FusionPassword'
 *       - $ref: '#/components/parameters/FusionToken'
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 *       401: { $ref: '#/components/responses/FusionUnauthorized' }
 *   delete:
 *     summary: Delete a web farm server (port of IWebFarmServerService23.Delete23)
 *     tags: [WebFarmServers]
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
router.delete(secure("/:id"), fusionAuth, controller.remove);
credentialHint(router, GROUP, "DELETE", "/:id");

module.exports = router;
