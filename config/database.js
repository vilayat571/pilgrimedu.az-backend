const mongoose = require("mongoose");

const url = "mongodb+srv://vilayat571:0oH3x1PDEwG3HIJ5@pilgrimdb.6b3ws.mongodb.net/?retryWrites=true&w=majority&appName=pilgrimdb";

const db = () => {
  mongoose
    .connect(url)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB connection error:", err.message));
};

module.exports = db;
