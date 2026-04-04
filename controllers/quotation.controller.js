// controllers/quotation.controller.js
const Quotation = require("../models/Quotation");
const QuotationLine = require("../models/QuotationLine");

exports.createQuotation = async (req, res) => {
  try {
    const { quotationId, header, items } = req.body;

    const lineIds = [];

    for (const item of items) {
      const line = await QuotationLine.create({
        quotationId,
        ...item
      });
      lineIds.push(line._id);
    }

    const quotation = await Quotation.create({
      quotationId,
      ...header,
      lines: lineIds
    });

    res.status(201).json(quotation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find().populate("lines");
    res.json(quotations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuotationById = async (req, res) => {
  try {
    const quotation = await Quotation.findOne({
      quotationId: req.params.id
    }).populate("lines");

    if (!quotation) {
      return res.status(404).json({ error: "Quotation not found" });
    }

    res.json(quotation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateQuotation = async (req, res) => {
  try {
    const updated = await Quotation.findOneAndUpdate(
      { quotationId: req.params.id },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteQuotation = async (req, res) => {
  try {
    await Quotation.findOneAndDelete({ quotationId: req.params.id });
    res.json({ message: "Quotation deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 NEW: Get quotations by userId
exports.getQuotationsByUserId = async (req, res) => {
  try {
    const quotations = await Quotation.find({
      customerId: req.params.userId
    }).populate("lines");

    res.json(quotations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 NEW: Get quotations by salespersonId
exports.getQuotationsBySalespersonId = async (req, res) => {
  try {
    const quotations = await Quotation.find({
      salespersonId: req.params.salesId
    }).populate("lines");

    res.json(quotations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Accept quotation → convert to invoice
exports.acceptQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findOne({
      quotationId: req.params.id
    }).populate("lines");

    if (!quotation) {
      return res.status(404).json({ error: "Quotation not found" });
    }

    quotation.status = "accepted";
    await quotation.save();

    res.json({
      message: "Quotation accepted. Invoice generation pending.",
      quotation
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
