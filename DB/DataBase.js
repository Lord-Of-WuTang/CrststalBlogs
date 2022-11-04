require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

// Connecting to MongoDB
function connectMongoDB() {
  mongoose.connect(MONGODB_URI);

  mongoose.connection.on("connected", () => {
    console.log("Connected to Database Successfully!");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error Connecting to Database!", err);
  });
}

module.exports = { connectMongoDB };
