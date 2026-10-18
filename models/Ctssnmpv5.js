const mongoose = require("mongoose");

const VariableSchema = new mongoose.Schema(
    {
        oid: String,
        name: String,
        value: String,
        dataType: String,
        units: String,
        sequenceOrder: Number
    },
    {
        _id: false
    }
);

const Ctssnmpv5Schema = new mongoose.Schema(
    {
        trapId: String,
        timestamp: String,
        sourceIp: String,
        communityString: String,
        snmpVersion: String,
        enterpriseOid: String,

        genericTrapType: Number,
        specificTrapCode: Number,

        agentAddress: String,

        messageGuid: String,

        receivedUtc: Date,

        destinationIp: String,

        trapOid: String,
        sysUpTime: String,

        engineId: String,
        userName: String,
        securityLevel: String,
        authProtocol: String,
        privacyProtocol: String,

        engineBoots: Number,
        engineTime: Number,

        contextEngineId: String,
        contextName: String,

        correlationId: String,
        tenantId: String,
        region: String,

        collectorVersion: String,
        collectionMethod: String,

        jsonPayload: String,
        rawPayload: String,

        lat: String,
        long: String,

        ctsfulllocation: String,

        vpnid: String,
        vpnid1: String,
        vpnid2: String,
        vpnid3: String,
        vpnid4: String,
        vpnid5: String,

        user1: String,
        user2: String,
        user3: String,
        user4: String,
        user5: String,

        loopbackSourceIp: String,

        description: String,

        severity: String,

        userid: String,
        oracleid: String,
        dynamicsid: String,
        ncrid: String,
        inventoryid: String,

        queue: String,
        producttypeid: String,

        techassigned: Number,

        repairticket: Number,

        variables: [VariableSchema]
    },
    {
        collection: "Ctssnmpv5",
        timestamps: false
    }
);

module.exports = mongoose.model(
    "Ctssnmpv5",
    Ctssnmpv5Schema
);
