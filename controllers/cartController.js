const Cart = require("../models/cart");

exports.getAllCarts = async (req, res) => {
  try {
    const data = await Cart.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCartById = async (req, res) => {
  try {
    const data = await Cart.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Cart not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCart = async (req, res) => {
  try {
    const data = new Cart(req.body);
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const data = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!data) return res.status(404).json({ message: "Cart not found" });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const data = await Cart.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: "Cart not found" });
    res.json({ message: "Cart deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
