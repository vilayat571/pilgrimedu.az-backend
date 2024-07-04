//  name: "",
// country: "",
// region: "",
// type: "",
// degree: "", //
// description: "",
// deadline: "",

const mongoose = require("mongoose");

const scholarship = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Scholarship", scholarship);
