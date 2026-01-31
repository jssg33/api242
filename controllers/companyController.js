const Company = require("../models/Company");

// GET all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().lean();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).lean();
    if (!company) return res.status(404).json({ error: "Company not found" });
    res.json(company);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// CREATE company
exports.createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "companyId must be unique" });
    }
    res.status(400).json({ error: err.message });
  }
};

// UPDATE company
exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!company) return res.status(404).json({ error: "Company not found" });

    res.json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE company
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) return res.status(404).json({ error: "Company not found" });

    res.json({ message: "Company deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};

