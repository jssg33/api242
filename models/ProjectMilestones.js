// models/ProjectMilestone.js
module.exports = (sequelize, DataTypes) => {
  const ProjectMilestone = sequelize.define(
    "ProjectMilestone",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      assignedTo: {
        type: DataTypes.INTEGER, // userId
        allowNull: true,
      },

      status: {
        type: DataTypes.STRING,
        defaultValue: "pending", // pending | in-progress | completed | delayed
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
      tableName: "ProjectMilestones",
      timestamps: true,
    }
  );

  ProjectMilestone.associate = (models) => {
    ProjectMilestone.belongsTo(models.Project, {
      foreignKey: "projectId",
      as: "project",
    });

    ProjectMilestone.belongsTo(models.User, {
      foreignKey: "assignedTo",
      as: "assignedUser",
    });
  };

  return ProjectMilestone;
};

