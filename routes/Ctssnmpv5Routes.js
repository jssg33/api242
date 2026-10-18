const express = require("express");
const router = express.Router();

const controller = require("../controllers/Ctssnmpv5Controller");

// routes/Ctssnmpv5Routes.js

/**
 * @openapi
 * components:
 *   schemas:
 *     Ctssnmpv5:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *
 *         trapId:
 *           type: string
 *
 *         timestamp:
 *           type: string
 *
 *         sourceIp:
 *           type: string
 *
 *         communityString:
 *           type: string
 *
 *         snmpVersion:
 *           type: string
 *
 *         enterpriseOid:
 *           type: string
 *
 *         genericTrapType:
 *           type: integer
 *
 *         specificTrapCode:
 *           type: integer
 *
 *         agentAddress:
 *           type: string
 *
 *         messageGuid:
 *           type: string
 *           format: uuid
 *
 *         receivedUtc:
 *           type: string
 *           format: date-time
 *
 *         destinationIp:
 *           type: string
 *
 *         trapOid:
 *           type: string
 *
 *         sysUpTime:
 *           type: string
 *
 *         engineId:
 *           type: string
 *
 *         userName:
 *           type: string
 *
 *         securityLevel:
 *           type: string
 *
 *         authProtocol:
 *           type: string
 *
 *         privacyProtocol:
 *           type: string
 *
 *         engineBoots:
 *           type: integer
 *           format: int64
 *
 *         engineTime:
 *           type: integer
 *           format: int64
 *
 *         contextEngineId:
 *           type: string
 *
 *         contextName:
 *           type: string
 *
 *         correlationId:
 *           type: string
 *
 *         tenantId:
 *           type: string
 *
 *         region:
 *           type: string
 *
 *         collectorVersion:
 *           type: string
 *
 *         collectionMethod:
 *           type: string
 *
 *         jsonPayload:
 *           type: string
 *
 *         rawPayload:
 *           type: string
 *
 *         lat:
 *           type: string
 *
 *         long:
 *           type: string
 *
 *         ctsfulllocation:
 *           type: string
 *
 *         vpnid:
 *           type: string
 *
 *         user1:
 *           type: string
 *
 *         user2:
 *           type: string
 *
 *         user3:
 *           type: string
 *
 *         user4:
 *           type: string
 *
 *         user5:
 *           type: string
 *
 *         loopbackSourceIp:
 *           type: string
 *
 *         description:
 *           type: string
 *
 *         severity:
 *           type: string
 *
 *         vpnid1:
 *           type: string
 *
 *         vpnid2:
 *           type: string
 *
 *         vpnid3:
 *           type: string
 *
 *         vpnid4:
 *           type: string
 *
 *         vpnid5:
 *           type: string
 *
 *         userid:
 *           type: string
 *
 *         oracleid:
 *           type: string
 *
 *         dynamicsid:
 *           type: string
 *
 *         ncrid:
 *           type: string
 *
 *         inventoryid:
 *           type: string
 *
 *         queue:
 *           type: string
 *
 *         producttypeid:
 *           type: string
 *
 *         techassigned:
 *           type: integer
 *
 *         repairticket:
 *           type: integer
 *           format: int64
 *
 *         variables:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Ctssnmpv5Variable'
 *
 *     Ctssnmpv5Variable:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *
 *         ctssnmpv5MessageId:
 *           type: integer
 *
 *         oid:
 *           type: string
 *
 *         name:
 *           type: string
 *
 *         value:
 *           type: string
 *
 *         dataType:
 *           type: string
 *
 *         units:
 *           type: string
 *
 *         sequenceOrder:
 *           type: integer
 */

router.get(
    "/api/Ctssnmpv5/:apiusername/:apipassword",
    controller.getAll
);

router.get(
    "/api/Ctssnmpv5/:apiusername/:apipassword/:id",
    controller.getById
);

router.post(
    "/api/Ctssnmpv5/:apiusername/:apipassword",
    controller.create
);

router.put(
    "/api/Ctssnmpv5/:apiusername/:apipassword/:id",
    controller.update
);

router.delete(
    "/api/Ctssnmpv5/:apiusername/:apipassword/:id",
    controller.remove
);

module.exports = router;
