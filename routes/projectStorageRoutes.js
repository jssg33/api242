const express = require("express");

const router = express.Router();

const controller =
    require("../controllers/projectStorageController");

/**
 * @swagger
 * tags:
 *   name: ProjectStorage
 *   description: Ensure project storage (GitHub repo or Azure container) has required folders
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EnsureDirectoriesRequest:
 *       type: object
 *       required:
 *         - storageProvider
 *       properties:
 *         storageProvider:
 *           type: string
 *           enum: [github, azure]
 *         repoUrl:
 *           type: string
 *           description: GitHub repo URL (required when storageProvider is github)
 *           example: https://github.com/owner/repo
 *         azureDirectory:
 *           type: string
 *           description: account/container/optional/path (required when storageProvider is azure)
 *         directories:
 *           type: array
 *           items:
 *             type: string
 *           description: Folders to ensure; defaults to ["docs"]
 *     EnsureDirectoriesResponse:
 *       type: object
 *       properties:
 *         storageProvider:
 *           type: string
 *         results:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               directory:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [exists, created]
 *               file:
 *                 type: string
 */

/**
 * @swagger
 * /projectstorage/api/projects/ensure-directories:
 *   post:
 *     summary: Ensure project storage directories exist, creating any that are missing
 *     tags: [ProjectStorage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnsureDirectoriesRequest'
 *     responses:
 *       200:
 *         description: Directory status per folder
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnsureDirectoriesResponse'
 *       400:
 *         description: Invalid storageProvider
 *       500:
 *         description: Storage error or missing server credentials
 */

router.post(
    "/api/projects/ensure-directories",
    controller.ensureDirectories
);

module.exports = router;
