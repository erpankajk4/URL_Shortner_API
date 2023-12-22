const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require('jsonwebtoken');

// Local Strategy configuration for user login
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: 'Incorrect username.' });
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) return done(null, false, { message: 'Incorrect password.' });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// JWT Strategy configuration for token-based authentication
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload._id);
      if (user) {
        return done(null, user); // Authentication successful
      } else {
        return done(null, false); // User not found
      }
    } catch (error) {
      return done(error, false); // Error during authentication
    }
  })
);

// Serialization and deserialization of user object for session management
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
