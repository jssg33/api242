const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Ctssnmpv5 = sequelize.define(
        "Ctssnmpv5",
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            TrapId: DataTypes.STRING,
            Timestamp: DataTypes.STRING,
            SourceIp: DataTypes.STRING,
            CommunityString: DataTypes.STRING,
            SnmpVersion: DataTypes.STRING,
            EnterpriseOid: DataTypes.STRING,
            GenericTrapType: DataTypes.INTEGER,
            SpecificTrapCode: DataTypes.INTEGER,
            AgentAddress: DataTypes.STRING,

            MessageGuid: DataTypes.UUID,
            ReceivedUtc: DataTypes.DATE,
            DestinationIp: DataTypes.STRING,

            TrapOid: DataTypes.STRING,
            SysUpTime: DataTypes.STRING,

            EngineId: DataTypes.STRING,
            UserName: DataTypes.STRING,
            SecurityLevel: DataTypes.STRING,
            AuthProtocol: DataTypes.STRING,
            PrivacyProtocol: DataTypes.STRING,

            EngineBoots: DataTypes.BIGINT,
            EngineTime: DataTypes.BIGINT,

            ContextEngineId: DataTypes.STRING,
            ContextName: DataTypes.STRING,

            CorrelationId: DataTypes.STRING,
            TenantId: DataTypes.STRING,
            Region: DataTypes.STRING,

            CollectorVersion: DataTypes.STRING,
            CollectionMethod: DataTypes.STRING,

            JsonPayload: DataTypes.TEXT("long"),
            RawPayload: DataTypes.TEXT("long"),

            Lat: DataTypes.STRING,
            Long: DataTypes.STRING,
            Ctsfulllocation: DataTypes.STRING,

            Vpnid: DataTypes.STRING,
            Vpnid1: DataTypes.STRING,
            Vpnid2: DataTypes.STRING,
            Vpnid3: DataTypes.STRING,
            Vpnid4: DataTypes.STRING,
            Vpnid5: DataTypes.STRING,

            User1: DataTypes.STRING,
            User2: DataTypes.STRING,
            User3: DataTypes.STRING,
            User4: DataTypes.STRING,
            User5: DataTypes.STRING,

            LoopbackSourceIp: DataTypes.STRING,

            Description: DataTypes.TEXT,

            Severity: DataTypes.STRING,

            Userid: DataTypes.STRING,
            Oracleid: DataTypes.STRING,
            Dynamicsid: DataTypes.STRING,
            Ncrid: DataTypes.STRING,
            Inventoryid: DataTypes.STRING,

            Queue: DataTypes.STRING,
            Producttypeid: DataTypes.STRING,

            Techassigned: DataTypes.INTEGER,

            Repairticket: DataTypes.BIGINT
        },
        {
            tableName: "Ctssnmpv5s",
            timestamps: false
        }
    );

    return Ctssnmpv5;
};
