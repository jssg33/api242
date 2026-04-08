// auth.js (DTOs + signup controller)

// ---------------------------
// DTO CLASSES
// ---------------------------

class LoginRequest {
  constructor(body) {
    this.username = body.username;
    this.plainPassword = body.plainPassword;
  }

  validate() {
    if (!this.username) return "Username is required";
    if (!this.plainPassword) return "PlainPassword is required";
    return null;
  }
}

class SignupRequest {
  constructor(body) {
    this.firstname = body.firstname;
    this.lastname = body.lastname;
    this.username = body.username;
    this.email = body.email;
    this.plainPassword = body.plainPassword;
    this.activepictureurl = body.activepictureurl;
  }

  validate() {
    if (!this.firstname) return "Firstname is required";
    if (!this.lastname) return "Lastname is required";
    if (!this.username) return "Username is required";
    if (!this.email) return "Email is required";
    if (!this.plainPassword) return "PlainPassword is required";
    if (!this.activepictureurl) return "Activepictureurl is required";
    return null;
  }
}

class ForgotPasswordRequest {
  constructor(body) {
    this.email = body.email;
  }

  validate() {
    if (!this.email) return "Email is required";
    return null;
  }
}

class ResetPasswordRequest {
  constructor(body) {
    this.resetToken = body.resetToken;
    this.newPassword = body.newPassword;
  }

  validate() {
    if (!this.resetToken) return "ResetToken is required";
    if (!this.newPassword) return "NewPassword is required";
    return null;
  }
}

class ResetPasswordRequestProfile {
  constructor(body) {
    this.currentPassword = body.currentPassword;
    this.newPassword = body.newPassword;
  }

  validate() {
    if (!this.currentPassword) return "CurrentPassword is required";
    if (!this.newPassword) return "NewPassword is required";
    return null;
  }
}

// ---------------------------
// SIGNUP CONTROLLER
// ---------------------------

const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.signup = async (req, res) => {
  try {
    const signupRequest = new SignupRequest(req.body);

    // Validate DTO
    const validationError = signupRequest.validate();
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: signupRequest.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Build fullname
    const fullname = `${signupRequest.firstname} ${signupRequest.lastname}`.trim();

    // Hash password
    const hashedPassword = await bcrypt.hash(signupRequest.plainPassword, 10);

    // Create user
    const newUser = new User({
      firstname: signupRequest.firstname,
      lastname: signupRequest.lastname,
      fullname: fullname,
      username: signupRequest.username,
      email: signupRequest.email,
      password: hashedPassword,
      activepictureurl: signupRequest.activepictureurl,
      status: "active"
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      userId: newUser._id
    });

  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------------------
// EXPORTS
// ---------------------------

module.exports = {
  LoginRequest,
  SignupRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ResetPasswordRequestProfile,
  signup: exports.signup
};
