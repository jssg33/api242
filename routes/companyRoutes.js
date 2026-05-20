const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

/**
 * @openapi
 * components:
 *   schemas:
 *     BusinessUnit:
 *       type: object
 *       required:
 *         - buid
 *         - buname
 *       properties:
 *         buid:
 *           type: string
 *         buname:
 *           type: string
 *
 *     OrganizationUnit:
 *       type: object
 *       required:
 *         - ouid
 *         - ouname
 *       properties:
 *         ouid:
 *           type: string
 *         ouname:
 *           type: string
 *         businessunits:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BusinessUnit'
 *
 *     Company:
 *       type: object
 *       required:
 *         - companyId
 *         - name
 *         - address1
 *         - city
 *         - state
 *         - zip
 *         - country
 *       properties:
 *         id:
 *           type: string
 *         companyId:
 *           type: string
 *         name:
 *           type: string
 *         address1:
 *           type: string
 *         address2:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         zip:
 *           type: string
 *         country:
 *           type: string
 *         phone:
 *           type: string
 *         fax:
 *           type: string
 *         email:
 *           type: string
 *         organizationunits:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrganizationUnit'
 *         createdAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: "67a1b2c3d4e5f6a7b8c9d0e1"
 *         companyId: "COMP-001"
 *         name: "Wavecrest Technologies"
 *         address1: "123 Main Street"
 *         address2: "Suite 200"
 *         city: "Charlotte"
 *         state: "NC"
 *         zip: "28202"
 *         country: "USA"
 *         phone: "555-123-4567"
 *         fax: "555-987-6543"
 *         email: "info@wavecrest.com"
 *         organizationunits:
 *           - ouid: "OU-001"
 *             ouname: "North America Division"
 *             businessunits:
 *               - buid: "BU-100"
 *                 buname: "Fiber Services"
 *               - buid: "BU-200"
 *                 buname: "Wireless Services"
 *         createdAt: "2025-01-30T12:34:56.000Z"
 */

/**
 * @openapi
 * /companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: List of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 */
router.get("/", companyController.getAllCompanies);

/**
 * @openapi
 * /companies/{id}:
 *   get:
 *     summary: Get a company by ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: Company not found
 */
router.get("/:id", companyController.getCompanyById);

/**
 * @openapi
 * /companies:
 *   post:
 *     summary: Create a new company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       201:
 *         description: Company created successfully
 *       400:
 *         description: Invalid input
 *       409:
 *         description: companyId must be unique
 */
router.post("/", companyController.createCompany);

/**
 * @openapi
 * /companies/{id}:
 *   put:
 *     summary: Update a company (including OUs and BUs)
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: Company updated
 *       404:
 *         description: Company not found
 */
router.put("/:id", companyController.updateCompany);

/**
 * @openapi
 * /companies/{id}:
 *   delete:
 *     summary: Delete a company
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company deleted
 *       404:
 *         description: Company not found
 */
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
