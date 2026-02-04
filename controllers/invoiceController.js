const Invoice = require("../models/invoiceModel");

// -------------------------------------------------
// GET /invoices
// -------------------------------------------------
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching invoices", error });
  }
};

// -------------------------------------------------
// POST /invoices
// -------------------------------------------------
exports.createInvoice = async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    const saved = await invoice.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creating invoice", error });
  }
};

// -------------------------------------------------
// GET /invoices/:id
// -------------------------------------------------
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Error fetching invoice", error });
  }
};

// -------------------------------------------------
// PUT /invoices/:id
// -------------------------------------------------
exports.updateInvoice = async (req, res) => {
  try {
    const updated = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating invoice", error });
  }
};

// -------------------------------------------------
// DELETE /invoices/:id
// -------------------------------------------------
exports.deleteInvoice = async (req, res) => {
  try {
    const deleted = await Invoice.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json({ message: "Invoice deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting invoice", error });
  }
};

// -------------------------------------------------
// GET /invoices/customer/:customerId
// -------------------------------------------------
exports.getInvoicesByCustomer = async (req, res) => {
  try {
    const invoices = await Invoice.find({ customerId: req.params.customerId });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer invoices", error });
  }
};
