const CGCart = require("../models/CGCart");

exports.postCGCart = async (req, res) => {
  try {
    const cart = new CGCart(req.body);
    const saved = await cart.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
