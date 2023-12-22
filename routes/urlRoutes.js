const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlController");
const passport = require("passport");

// Endpoint to handle URL shortening, requires JWT authentication
router.post(
  "/shorten",
  passport.authenticate("jwt", { session: false }),
  urlController.shortenURL
);

// Endpoint to handle retrieving all shortened URLs for a user
router.get(
  "/allShortenURLs",
  passport.authenticate("jwt", { session: false }),
  urlController.allShortenURLs
);

// Endpoint to handle URL redirection
router.get("/:shortURL", urlController.redirect);


module.exports = router;
