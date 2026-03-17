// models/UserGroup.js
module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define(
    "UserGroup",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "member",
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "active",
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "UserGroups",
      timestamps: true,
    }
  );

  UserGroup.associate = (models) => {
    UserGroup.belongsTo(models.User, { foreignKey: "userId" });
    UserGroup.belongsTo(models.Group, { foreignKey: "groupId" });
  };

  return UserGroup;
};

