const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

const url = DB_URL

const db = () => {
  mongoose
    .connect(url, {
      serverSelectionTimeoutMS: 60000, // Increase to 60 seconds
    })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB connection error:", err.message));
};

module.exports = db;
