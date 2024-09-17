const mongoose = require("mongoose");

const url = "";

const db = () => {
  mongoose
    .connect(url)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB connection error:", err.message));
};

module.exports = db;
