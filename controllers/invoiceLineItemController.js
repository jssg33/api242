const InvoiceLineItem = require("../models/invoiceLineItemModel");

// -------------------------------------------------
// GET /invoice-line-items
// -------------------------------------------------
exports.getLineItems = async (req, res) => {
  try {
    const items = await InvoiceLineItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching line items", error });
  }
};

// -------------------------------------------------
// POST /invoice-line-items
// -------------------------------------------------
exports.createLineItem = async (req, res) => {
  try {
    const item = new InvoiceLineItem(req.body);

    // Auto-calc totals
    item.lineSubtotal = item.quantity * item.unitCost;
    item.lineTotal =
      item.lineSubtotal + (item.taxAmount || 0) - (item.discountAmount || 0);

    const saved = await item.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creating line item", error });
  }
};

// -------------------------------------------------
// GET /invoice-line-items/:id
// -------------------------------------------------
exports.getLineItemById = async (req, res) => {
  try {
    const item = await InvoiceLineItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Line item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching line item", error });
  }
};

// -------------------------------------------------
// PUT /invoice-line-items/:id
// -------------------------------------------------
exports.updateLineItem = async (req, res) => {
  try {
    const updatedData = req.body;

    // Recalculate totals if needed
    if (updatedData.quantity || updatedData.unitCost) {
      updatedData.lineSubtotal =
        (updatedData.quantity || 0) * (updatedData.unitCost || 0);
    }

    if (
      updatedData.lineSubtotal !== undefined ||
      updatedData.taxAmount !== undefined ||
      updatedData.discountAmount !== undefined
    ) {
      updatedData.lineTotal =
        (updatedData.lineSubtotal ?? 0) +
        (updatedData.taxAmount ?? 0) -
        (updatedData.discountAmount ?? 0);
    }

    const updated = await InvoiceLineItem.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Line item not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating line item", error });
  }
};

// -------------------------------------------------
// DELETE /invoice-line-items/:id
// -------------------------------------------------
exports.deleteLineItem = async (req, res) => {
  try {
    const deleted = await InvoiceLineItem.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Line item not found" });
    }

    res.status(200).json({ message: "Line item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting line item", error });
  }
};

// -------------------------------------------------
// GET /invoice-line-items/invoice/:invoiceId
// -------------------------------------------------
exports.getLineItemsByInvoice = async (req, res) => {
  try {
    const items = await InvoiceLineItem.find({
      invoiceId: req.params.invoiceId
    });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching invoice line items", error });
  }
};
