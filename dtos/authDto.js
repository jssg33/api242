const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { SignupRequest } = require("../dtos/authDto");

exports.signup = async (req, res) => {
  try {
    // Build DTO
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

    // Build fullname (required by schema)
    const fullname = `${signupRequest.firstname} ${signupRequest.lastname}`.trim();

    // Hash password
    const hashedPassword = await bcrypt.hash(signupRequest.plainPassword, 10);

    // Create user object
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

    // Save user
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
