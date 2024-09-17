const mongoose = require("mongoose");

const url = "mongodb+srv://user1:tzyHIlfBvQqZAOgi@cluster-test-azer.6b3ws.mongodb.net/?retryWrites=true&w=majority&appName=cluster-test-azer";

const db = () => {
  mongoose
    .connect(url)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB connection error:", err.message));
};

module.exports = db;
