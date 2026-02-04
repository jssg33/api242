const Card = require("../models/cards");

/**
 * GET /cards
 */
exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cards", error });
  }
};

/**
 * POST /cards
 */
exports.createCard = async (req, res) => {
  try {
    const card = new Card(req.body);
    const saved = await card.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error creating card", error });
  }
};

/**
 * GET /cards/:id
 */
exports.getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: "Error fetching card", error });
  }
};

/**
 * PUT /cards/:id
 */
exports.updateCard = async (req, res) => {
  try {
    const updated = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating card", error });
  }
};

/**
 * DELETE /cards/:id
 */
exports.deleteCard = async (req, res) => {
  try {
    const deleted = await Card.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json({ message: "Card deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting card", error });
  }
};

/**
 * GET /cards/user/:userid
 */
exports.getCardsByUser = async (req, res) => {
  try {
    const cards = await Card.find({ userid: req.params.userid });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user cards", error });
  }
};
