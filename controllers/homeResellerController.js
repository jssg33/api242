const HomeReseller = require('../models/HomeReseller');

//
// CREATE a new property
//
exports.createProperty = async (req, res) => {
  try {
    const property = new HomeReseller(req.body);
    const saved = await property.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//
// GET properties with flexible query filters
//
exports.getProperties = async (req, res) => {
  try {
    const { propertyid, userid, username, resellerName, addressId } = req.query;

    const filter = {};

    if (propertyid) filter._id = propertyid;
    if (userid) filter.userid = userid;
    if (username) filter.username = username;
    if (resellerName) filter.resellerName = new RegExp(resellerName, 'i');

    // ⭐ FULL CRUD SUPPORT: filter by Address.Id
    if (addressId) filter["address.Id"] = Number(addressId);

    const properties = await HomeReseller.find(filter);
    res.json(properties);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//
// GET a single property by MongoDB _id
//
exports.getPropertyById = async (req, res) => {
  try {
    const property = await HomeReseller.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//
// ⭐ NEW: GET a single property by Address.Id
//
exports.getPropertyByAddressId = async (req, res) => {
  try {
    const property = await HomeReseller.findOne({
      "address.Id": Number(req.params.addressId)
    });

    if (!property) return res.status(404).json({ error: 'Property not found' });

    res.json(property);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//
// UPDATE a property by MongoDB _id
//
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

//
// ⭐ NEW: UPDATE a property by Address.Id
//
exports.updatePropertyByAddressId = async (req, res) => {
  try {
    const updated = await HomeReseller.findOneAndUpdate(
      { "address.Id": Number(req.params.addressId) },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Property not found' });

    res.json(updated);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//
// DELETE a property by MongoDB _id
//
exports.deleteProperty = async (req, res) => {
  try {
    const deleted = await HomeReseller.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ error: 'Property not found' });

    res.json({ message: 'Property deleted successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//
// ⭐ NEW: DELETE a property by Address.Id
//
exports.deletePropertyByAddressId = async (req, res) => {
  try {
    const deleted = await HomeReseller.findOneAndDelete({
      "address.Id": Number(req.params.addressId)
    });

    if (!deleted) return res.status(404).json({ error: 'Property not found' });

    res.json({ message: 'Property deleted successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

