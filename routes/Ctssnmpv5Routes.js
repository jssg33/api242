const express = require("express");
const router = express.Router();

const controller = require("../controllers/Ctssnmpv5Controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Ctssnmpv5:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         trapId:
 *           type: string
 *         timestamp:
 *           type: string
 *         sourceIp:
 *           type: string
 *         communityString:
 *           type: string
 *         snmpVersion:
 *           type: string
 *         enterpriseOid:
 *           type: string
 *         genericTrapType:
 *           type: integer
 *         specificTrapCode:
 *           type: integer
 *         agentAddress:
 *           type: string
 *         messageGuid:
 *           type: string
 *           format: uuid
 *         receivedUtc:
 *           type: string
 *           format: date-time
 *         destinationIp:
 *           type: string
 *         trapOid:
 *           type: string
 *         sysUpTime:
 *           type: string
 *         engineId:
 *           type: string
 *         userName:
 *           type: string
 *         securityLevel:
 *           type: string
 *         authProtocol:
 *           type: string
 *         privacyProtocol:
 *           type: string
 *         engineBoots:
 *           type: integer
 *         engineTime:
 *           type: integer
 *         contextEngineId:
 *           type: string
 *         contextName:
 *           type: string
 *         correlationId:
 *           type: string
 *         tenantId:
 *           type: string
 *         region:
 *           type: string
 *         collectorVersion:
 *           type: string
 *         collectionMethod:
 *           type: string
 *         jsonPayload:
 *           type: string
 *         rawPayload:
 *           type: string
 *         lat:
 *           type: string
 *         long:
 *           type: string
 *         ctsfulllocation:
 *           type: string
 *         vpnid:
 *           type: string
 *         user1:
 *           type: string
 *         user2:
 *           type: string
 *         user3:
 *           type: string
 *         user4:
 *           type: string
 *         user5:
 *           type: string
 *         loopbackSourceIp:
 *           type: string
 *         description:
 *           type: string
 *         severity:
 *           type: string
 *         vpnid1:
 *           type: string
 *         vpnid2:
 *           type: string
 *         vpnid3:
 *           type: string
 *         vpnid4:
 *           type: string
 *         vpnid5:
 *           type: string
 *         userid:
 *           type: string
 *         oracleid:
 *           type: string
 *         dynamicsid:
 *           type: string
 *         ncrid:
 *           type: string
 *         inventoryid:
 *           type: string
 *         queue:
 *           type: string
 *         producttypeid:
 *           type: string
 *         techassigned:
 *           type: integer
 *         repairticket:
 *           type: integer
 */

/**
 * @swagger
 * /api/Ctssnmpv5/{apiusername}/{apipassword}:
 *   get:
 *     tags:
 *       - Ctssnmpv5
 *     summary: Get all SNMP records
 *     parameters:
 *       - in: path
 *         name: apiusername
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: apipassword
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get(
    "/api/Ctssnmpv5/:apiusername/:apipassword",
    controller.getAll
);

/**
 * @swagger
 * /api/Ctssnmpv5/{apiusername}/{apipassword}/{id}:
 *   get:
 *     tags:
 *       - Ctssnmpv5
 *     summary: Get SNMP record by ID
 *     parameters:
 *       - in: path
 *         name: apiusername
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: apipassword
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */
router.get(
    "/api/Ctssnmpv5/:apiusername/:apipassword/:id",
    controller.getById
);

/**
 * @swagger
 * /api/Ctssnmpv5/{apiusername}/{apipassword}:
 *   post:
 *     tags:
 *       - Ctssnmpv5
 *     summary: Create SNMP record
 *     parameters:
 *       - in: path
 *         name: apiusername
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: apipassword
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ctssnmpv5'
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
    "/api/Ctssnmpv5/:apiusername/:apipassword",
    controller.create
);

/**
 * @swagger
 * /api/Ctssnmpv5/{apiusername}/{apipassword}/{id}:
 *   put:
 *     tags:
 *       - Ctssnmpv5
 *     summary: Update SNMP record
 *     parameters:
 *       - in: path
 *         name: apiusername
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: apipassword
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ctssnmpv5'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put(
    "/api/Ctssnmpv5/:apiusername/:apipassword/:id",
    controller.update
);

/**
 * @swagger
 * /api/Ctssnmpv5/{apiusername}/{apipassword}/{id}:
 *   delete:
 *     tags:
 *       - Ctssnmpv5
 *     summary: Delete SNMP record
 *     parameters:
 *       - in: path
 *         name: apiusername
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: apipassword
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete(
    "/api/Ctssnmpv5/:apiusername/:apipassword/:id",
    controller.remove
);

module.exports = router;
