// Load environment variables from .env file
require('dotenv').config(".env");

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const passportConfig = require("./config/passport");
const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");
const db = require("./config/mongoose");


// Initialize Express app
const app = express();

// Middleware
// Body parser middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session middleware for managing sessions
app.use(expressSession({ 
  resave: false,   
  saveUninitialized: false, 
  secret: process.env.Express_SESSION_SECRET,
}))

// Initialize Passport and session management
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);  // Authentication routes
app.use("/url", urlRoutes); // URL-related routes

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



// npm install express dotenv express-session jsonwebtoken mongoose nanoid passport passport-local bcryptjs body-parser
