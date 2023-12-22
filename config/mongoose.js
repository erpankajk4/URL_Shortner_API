const mongoose = require("mongoose");

// Connection to the database
mongoose.connect(process.env.db || "mongodb://127.0.0.1/url_shortner_API", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// acquire the connection (to check if it is successful or not)
const db = mongoose.connection;
// if error
db.on("error", function (err) {
  console.error("Connection error:", err);
});
// up and running, print the message
db.once("open", function () {
  console.log("Successfully connected to the database");
});
