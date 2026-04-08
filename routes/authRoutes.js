/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - username
 *         - plainpassword
 *       properties:
 *         username:
 *           type: string
 *           example: johndoe
 *         plainpassword:
 *           type: string
 *           example: StrongPassword123
 *
 *     SignupRequest:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - username
 *         - email
 *         - plainpassword
 *         - activepictureurl
 *       properties:
 *         firstname:
 *           type: string
 *           example: John
 *         lastname:
 *           type: string
 *           example: Doe
 *         username:
 *           type: string
 *           example: johndoe
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         plainpassword:
 *           type: string
 *           example: StrongPassword123
 *         activepictureurl:
 *           type: string
 *           example: https://example.com/profile.jpg
 *
 *     ForgotPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           example: user@example.com
 *
 *     ResetPasswordRequest:
 *       type: object
 *       required:
 *         - resetToken
 *         - newPassword
 *       properties:
 *         resetToken:
 *           type: string
 *           example: 123456abcdef
 *         newPassword:
 *           type: string
 *           example: NewStrongPassword123
 *
 *     ResetPasswordRequestProfile:
 *       type: object
 *       required:
 *         - currentPassword
 *         - newPassword
 *       properties:
 *         currentPassword:
 *           type: string
 *           example: OldPassword123
 *         newPassword:
 *           type: string
 *           example: NewPassword456
 */

const express = require("express");
const router = express.Router();

const {
  LoginRequest,
  SignupRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ResetPasswordRequestProfile
} = require("../dtos/authDto");

const controller = require("../controllers/authController");

function validate(dtoClass) {
  return (req, res, next) => {
    const dto = new dtoClass(req.body);
    const error = dto.validate();
    if (error) return res.status(400).json({ message: error });
    req.dto = dto;
    next();
  };
}

/**
 * @swagger
 * /auth/loginLocal:
 *   post:
 *     summary: Login using local JSON credentials
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
router.post("/loginLocal", validate(LoginRequest), controller.loginLocal);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login (local JSON first, then MongoDB fallback)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", validate(LoginRequest), controller.login);

/**
 * @swagger
 * /auth/signupLocal:
 *   post:
 *     summary: Register a new user (local JSON)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error or user already exists
 */
router.post("/signupLocal", validate(SignupRequest), controller.signupLocal);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user (MongoDB)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignupRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error or user already exists
 */
router.post("/signup", validate(SignupRequest), controller.signup);

/**
 * @swagger
 * /auth/resetPasswordProfile:
 *   post:
 *     summary: Reset password from user profile (requires current password)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequestProfile'
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/resetPasswordProfile",
  validate(ResetPasswordRequestProfile),
  controller.resetPasswordProfile
);

/**
 * @swagger
 * /auth/resetPasswordLocal:
 *   post:
 *     summary: Reset password using local JSON token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Validation error
 */
router.post(
  "/resetPasswordLocal",
  validate(ResetPasswordRequest),
  controller.resetPasswordLocal
);

/**
 * @swagger
 * /auth/resetPassword:
 *   post:
 *     summary: Reset password (MongoDB)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Validation error
 */
router.post(
  "/resetPassword",
  validate(ResetPasswordRequest),
  controller.resetPassword
);

module.exports = router;
