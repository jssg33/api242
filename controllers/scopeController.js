const Scope = require("../models/Scope");

exports.createScope = async (req, res) => {
  try {
    const scope = new Scope(req.body);
    const saved = await scope.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getScopes = async (req, res) => {
  try {
    const list = await Scope.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
