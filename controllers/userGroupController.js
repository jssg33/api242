// controllers/userGroupController.js
const UserGroup = require("../models/UserGroup");

// Create a new UserGroup entry
exports.createUserGroup = async (req, res) => {
  try {
    const { userId, groupId, role, status } = req.body;
    const userGroup = await UserGroup.create({ userId, groupId, role, status });
    res.status(201).json(userGroup);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all UserGroup entries
exports.getAllUserGroups = async (req, res) => {
  try {
    const userGroups = await UserGroup.find().lean();
    res.status(200).json(userGroups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single UserGroup by ID
exports.getUserGroupById = async (req, res) => {
  try {
    const userGroup = await UserGroup.findById(req.params.id).lean();
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
    const updated = await UserGroup.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ error: "UserGroup not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a UserGroup entry
exports.deleteUserGroup = async (req, res) => {
  try {
    const deleted = await UserGroup.findByIdAndDelete(req.params.id);
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
    const groups = await UserGroup.find({ userId: Number(req.params.userId) }).lean();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users in a specific group
exports.getUsersByGroup = async (req, res) => {
  try {
    const users = await UserGroup.find({ groupId: Number(req.params.groupId) }).lean();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
