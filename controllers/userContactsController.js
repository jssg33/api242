const UserContact = require("../models/userContactsModel");

// CREATE
exports.createContact = async (req, res) => {
  try {
    const contact = await UserContact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL
exports.getContacts = async (req, res) => {
  try {
    const contacts = await UserContact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE
exports.getContactById = async (req, res) => {
  try {
    const contact = await UserContact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateContact = async (req, res) => {
  try {
    const contact = await UserContact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteContact = async (req, res) => {
  try {
    const contact = await UserContact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
