const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");

// Function to create a JWT token with a provided user ID
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// Function to handle user registration
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered!" });
    }
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    // Creating a new user instance with hashed password
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

// Function to handle user login
exports.login = async (req, res) => {
  try {
    // Generate a token for the authenticated user
    const token = createToken(req.user._id);
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ error: "Error creating token" });
  }
};

// Function to handle user logout
exports.logout = (req, res) => {
  req.logout();
  res.json({ message: "Logged out successfully" });
};
