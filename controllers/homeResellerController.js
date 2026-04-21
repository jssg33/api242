const HomeReseller = require('../models/HomeReseller');

// CREATE a new property
exports.createProperty = async (req, res) => {
  try {
    const property = new HomeReseller(req.body);
    const saved = await property.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET properties with flexible query filters
exports.getProperties = async (req, res) => {
  try {
    const { propertyid, userid, username, resellerName } = req.query;

    const filter = {};

    if (propertyid) filter._id = propertyid;
    if (userid) filter.userid = userid;
    if (username) filter.username = username;
    if (resellerName) filter.resellerName = new RegExp(resellerName, 'i'); // partial match

    const properties = await HomeReseller.find(filter);
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a single property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await HomeReseller.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a property
exports.updateProperty = async (req, res) => {
  try {
    const updated = await HomeReseller.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Property not found' });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE a property
exports.deleteProperty = async (req, res) => {
  try {
    const deleted = await HomeReseller.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ error: 'Property not found' });

    res.json({ message: 'Property deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
