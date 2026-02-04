const SalesCatalogue = require("../models/salesCatalogueModel");

// -------------------------------------------------
// GET /sales-catalogue
// -------------------------------------------------
exports.getItems = async (req, res) => {
  try {
    const items = await SalesCatalogue.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching catalogue items", error });
  }
};

// -------------------------------------------------
// POST /sales-catalogue
// -------------------------------------------------
exports.createItem = async (req, res) => {
  try {
    const item = new SalesCatalogue(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creating catalogue item", error });
  }
};

// -------------------------------------------------
// GET /sales-catalogue/:id
// -------------------------------------------------
exports.getItemById = async (req, res) => {
  try {
    const item = await SalesCatalogue.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Catalogue item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching catalogue item", error });
  }
};

// -------------------------------------------------
// PUT /sales-catalogue/:id
// -------------------------------------------------
exports.updateItem = async (req, res) => {
  try {
    const updated = await SalesCatalogue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Catalogue item not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating catalogue item", error });
  }
};

// -------------------------------------------------
// DELETE /sales-catalogue/:id
// -------------------------------------------------
exports.deleteItem = async (req, res) => {
  try {
    const deleted = await SalesCatalogue.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Catalogue item not found" });
    }

    res.status(200).json({ message: "Catalogue item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting catalogue item", error });
  }
};

// -------------------------------------------------
// GET /sales-catalogue/park/:parkId
// -------------------------------------------------
exports.getItemsByPark = async (req, res) => {
  try {
    const items = await SalesCatalogue.find({ parkId: req.params.parkId });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching park catalogue items", error });
  }
};
