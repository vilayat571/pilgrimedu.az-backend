const mongoose = require("mongoose");

const Images = new mongoose.Schema({
  resultImg: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Images", Images);
