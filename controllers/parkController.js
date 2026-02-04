const Park = require("../models/parkModel");

// -------------------------------------------------
// GET /parks
// -------------------------------------------------
exports.getParks = async (req, res) => {
  try {
    const parks = await Park.find();
    res.status(200).json(parks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parks", error });
  }
};

// -------------------------------------------------
// POST /parks
// -------------------------------------------------
exports.createPark = async (req, res) => {
  try {
    const park = new Park(req.body);
    const saved = await park.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creating park", error });
  }
};

// -------------------------------------------------
// GET /parks/:id
// -------------------------------------------------
exports.getParkById = async (req, res) => {
  try {
    const park = await Park.findById(req.params.id);

    if (!park) {
      return res.status(404).json({ message: "Park not found" });
    }

    res.status(200).json(park);
  } catch (error) {
    res.status(500).json({ message: "Error fetching park", error });
  }
};

// -------------------------------------------------
// PUT /parks/:id
// -------------------------------------------------
exports.updatePark = async (req, res) => {
  try {
    const updated = await Park.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Park not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating park", error });
  }
};

// -------------------------------------------------
// DELETE /parks/:id
// -------------------------------------------------
exports.deletePark = async (req, res) => {
  try {
    const deleted = await Park.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Park not found" });
    }

    res.status(200).json({ message: "Park deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting park", error });
  }
};

// -------------------------------------------------
// GET /parks/state/:state
// -------------------------------------------------
exports.getParksByState = async (req, res) => {
  try {
    const parks = await Park.find({ state: req.params.state });
    res.status(200).json(parks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parks by state", error });
  }
};
