const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require("passport");

// Endpoint to handle user registration
router.post('/register', authController.register);
// Endpoint to handle user login with local strategy authentication using Passport
router.post('/login', passport.authenticate("local", { session: false }), authController.login);
// Endpoint to handle user logout
router.get('/logout', authController.logout);

module.exports = router;
