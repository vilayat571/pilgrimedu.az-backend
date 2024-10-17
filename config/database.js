const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables

const DB_URL = process.env.DB_URL;

const db = () => {
  // Log the URL for debugging
  console.log("Connecting to MongoDB at:", DB_URL);

  mongoose
    .connect(DB_URL, {
      serverSelectionTimeoutMS: 60000, // Increase to 60 seconds
    })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB connection error:", err.message));
};

module.exports = db;
