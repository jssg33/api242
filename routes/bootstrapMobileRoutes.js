/**
 * @openapi
 * components:
 *   schemas:
 *     BootstrapMobile:
 *       type: object
 *       properties:
 *         loginServer1:
 *           type: string
 *         loginServer2:
 *           type: string
 *         loginServer3:
 *           type: string
 *
 *         serviceaccount:
 *           type: string
 *         servicepasswdencrypted:
 *           type: string
 *         wordpresspostaccount:
 *           type: string
 *         wordpresspostpassword:
 *           type: string
 *
 *         registrationServer1:
 *           type: string
 *         registrationServer2:
 *           type: string
 *         registrationServer3:
 *           type: string
 *
 *         loginCipherOffset:
 *           type: string
 *         restCipherOffset:
 *           type: string
 *         cipherDefaultAlgorithm:
 *           type: string
 *
 *         defaultDomainName:
 *           type: string
 *         dnsServers:
 *           type: array
 *           items:
 *             type: string
 *
 *         instanceId:
 *           type: string
 *         instanceName:
 *           type: string
 *         customerName:
 *           type: string
 *         customerId:
 *           type: string
 *         region:
 *           type: string
 *
 * /api/bootstrapmobile:
 *   get:
 *     summary: Get the BootstrapMobile configuration
 *     tags:
 *       - BootstrapMobile
 *     responses:
 *       200:
 *         description: Returns the BootstrapMobile configuration
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BootstrapMobile'
 *
 *   put:
 *     summary: Update the BootstrapMobile configuration
 *     tags:
 *       - BootstrapMobile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BootstrapMobile'
 *     responses:
 *       200:
 *         description: Updated configuration
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BootstrapMobile'
 *
 * /api/bootstrapmobile/seed:
 *   post:
 *     summary: Seed default test configuration for luna.capitoltechnology.net
 *     tags:
 *       - BootstrapMobile
 *     responses:
 *       200:
 *         description: Seeded configuration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 record:
 *                   $ref: '#/components/schemas/BootstrapMobile'
 */

const express = require("express");
const {
  getBootstrapConfig,
  updateBootstrapConfig,
  seedBootstrapConfig
} = require("../controllers/BootstrapMobileController.js");

const router = express.Router();

router.get("/", getBootstrapConfig);
router.put("/", updateBootstrapConfig);
router.post("/seed", seedBootstrapConfig);

module.exports = router;
