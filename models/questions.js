const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});
≠
module.exports = mongoose.model("Questions", questionSchema);

// userName, email, phone, question
