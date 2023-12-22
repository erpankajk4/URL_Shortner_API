const shortid = require('shortid');

// Function to generate a short URL
const generateShortURL = () => {
  return shortid.generate().substring(0, 8); // Generates an 8-character unique string
};

module.exports = generateShortURL;
