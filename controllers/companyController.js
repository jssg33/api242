const Company = require("../models/Company");

exports.getAllCompanies = async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
};

exports.createCompany = async (req, res) => {
  const company = new Company(req.body);
  await company.save();
  res.status(201).json(company);
};
