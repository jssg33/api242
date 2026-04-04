// controllers/quotationlines.controller.js
const QuotationLine = require("../models/QuotationLine");

// Create a quotation line item
exports.createQuotationLine = async (req, res) => {
  try {
    const line = await QuotationLine.create(req.body);
    res.status(201).json(line);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all line items for a quotation
exports.getLinesByQuotationId = async (req, res) => {
  try {
    const lines = await QuotationLine.find({
      quotationId: req.params.quotationId
    });
    res.json(lines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 NEW: Get line items by customer/user ID
exports.getLinesByUserId = async (req, res) => {
  try {
    const lines = await QuotationLine.find({
      customerId: req.params.userId
    });
    res.json(lines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 NEW: Get line items by salesperson ID
exports.getLinesBySalespersonId = async (req, res) => {
  try {
    const lines = await QuotationLine.find({
      salespersonId: req.params.salesId
    });
    res.json(lines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single line item by ID
exports.getQuotationLineById = async (req, res) => {
  try {
    const line = await QuotationLine.findById(req.params.id);
    if (!line) return res.status(404).json({ error: "Line item not found" });
    res.json(line);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a quotation line item
exports.updateQuotationLine = async (req, res) => {
  try {
    const updated = await QuotationLine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a quotation line item
exports.deleteQuotationLine = async (req, res) => {
  try {
    await QuotationLine.findByIdAndDelete(req.params.id);
    res.json({ message: "Line item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
