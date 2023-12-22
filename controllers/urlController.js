const URL = require("../models/URL");
const User = require("../models/User");
const generateShortURL = require("../utils/shorten");

// Function to shorten a URL
exports.shortenURL = async (req, res) => {
  const { originalUrl } = req.body;
  // Generating a short ID for the URL
  const shortId = generateShortURL();

  try {
    const newURL = new URL({
      originalUrl,
      shortUrl: shortId,
      user: req.user._id,
    });

    await newURL.save();
     // Save the URL in the user document as well
     const user = await User.findById(req.user._id);
     if (user) {
       user.urls.push(newURL._id);
       await user.save();
     } else {
       // Handle if user is not found
       throw new Error('User not found');
     }

    res.status(201).json({ originalUrl, shortUrl: shortId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error shortening URL" });
  }
};

// Function to redirect to the original URL based on the short URL provided
exports.redirect = async (req, res) => {
  const { shortURL } = req.params;
  try {
    // Finding the URL entry in the database based on the short URL
    const url = await URL.findOne({ shortUrl: shortURL });
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }
    // Redirecting to the original URL associated with the short URL
    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: "Error redirecting" });
  }
};

// Function to fetch all URL's shorten by user
exports.allShortenURLs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('urls');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } 
    if (user.urls.length === 0) {
      return res.status(404).json({ error: "There are no URLs for this user" });
    }
    const urls = user.urls.map(url => ({
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl
    }));

    res.status(200).json({ urls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching URLs" });
  }
};
