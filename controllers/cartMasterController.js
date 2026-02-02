const CartMaster = require("../models/cartmaster");

exports.getAllCartMasters = async (req, res) => {
  try {
    const data = await CartMaster.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCartMasterById = async (req, res) => {
  try {
    const data = await CartMaster.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "CartMaster not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCartMaster = async (req, res) => {
  try {
    const data = new CartMaster(req.body);
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCartMaster = async (req, res) => {
  try {
    const data = await CartMaster.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!data) return res.status(404).json({ message: "CartMaster not found" });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCartMaster = async (req, res) => {
  try {
    const data = await CartMaster.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: "CartMaster not found" });
    res.json({ message: "CartMaster deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
