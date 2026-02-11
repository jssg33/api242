// routes/auth.routes.js
const express = require("express");
const router = express.Router();

const {
  LoginRequest,
  SignupRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ResetPasswordRequestProfile
} = require("../dto/authDto");

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

router.post("/loginLocal", validate(LoginRequest), controller.loginLocal);
router.post("/login", validate(LoginRequest), controller.login);

router.post("/signupLocal", validate(SignupRequest), controller.signupLocal);
router.post("/signup", validate(SignupRequest), controller.signup);

router.post(
  "/resetPasswordProfile",
  validate(ResetPasswordRequestProfile),
  controller.resetPasswordProfile
);

router.post(
  "/resetPasswordLocal",
  validate(ResetPasswordRequest),
  controller.resetPasswordLocal
);

router.post(
  "/resetPassword",
  validate(ResetPasswordRequest),
  controller.resetPassword
);

module.exports = router;
