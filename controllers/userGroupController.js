// controllers/userGroupController.js
const { UserGroup, User, Group } = require("../models/UserGroup");

// Create a new UserGroup entry
exports.createUserGroup = async (req, res) => {
  try {
    const { userId, groupId, role, status } = req.body;

    const userGroup = await UserGroup.create({
      userId,
      groupId,
      role,
      status,
    });

    res.status(201).json(userGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all UserGroup entries
exports.getAllUserGroups = async (req, res) => {
  try {
    const userGroups = await UserGroup.findAll({
      include: [User, Group],
    });

    res.status(200).json(userGroups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single UserGroup by ID
exports.getUserGroupById = async (req, res) => {
  try {
    const { id } = req.params;

    const userGroup = await UserGroup.findByPk(id, {
      include: [User, Group],
    });

    if (!userGroup) {
      return res.status(404).json({ error: "UserGroup not found" });
    }

    res.status(200).json(userGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a UserGroup entry
exports.updateUserGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await UserGroup.update(req.body, {
      where: { id },
    });

    if (!updated) {
      return res.status(404).json({ error: "UserGroup not found" });
    }

    const updatedUserGroup = await UserGroup.findByPk(id);
    res.status(200).json(updatedUserGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a UserGroup entry
exports.deleteUserGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await UserGroup.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({ error: "UserGroup not found" });
    }

    res.status(200).json({ message: "UserGroup deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all groups for a specific user
exports.getGroupsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const groups = await UserGroup.findAll({
      where: { userId },
      include: [Group],
    });

    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users in a specific group
exports.getUsersByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    const users = await UserGroup.findAll({
      where: { groupId },
      include: [User],
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
