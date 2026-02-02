const CartItem = require("../models/cartItem");

exports.getAllCartItems = async (req, res) => {
  try {
    const data = await CartItem.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCartItemById = async (req, res) => {
  try {
    const data = await CartItem.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "CartItem not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCartItemsByCartId = async (req, res) => {
  try {
    const data = await CartItem.find({ cartid: req.params.cartid });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCartItem = async (req, res) => {
  try {
    const data = new CartItem(req.body);
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const data = await CartItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!data) return res.status(404).json({ message: "CartItem not found" });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const data = await CartItem.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: "CartItem not found" });
    res.json({ message: "CartItem deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
