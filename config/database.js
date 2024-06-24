const mongoose = require("mongoose");

const url =
  "mongodb+srv://vilayat:gwdtYtwOYd1dpknz@pilgrim.5cdhyyf.mongodb.net/?retryWrites=true&w=majority&appName=pilgrim";

db = () => {
  mongoose
    .connect(url)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err.message));
};

module.exports = db;
