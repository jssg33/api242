const CGCart = require("../models/Southbound.js");

exports.postCGCart = async (req, res) => {
  try {
    const cart = new CGCart(req.body);
    const saved = await cart.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
