const Images = require("../models/images.js");

const addImage = async (req, res) => {
  try {
    const { title } = await req.body;

    const newItem = await Images.create({
      resultImg: `http://localhost:5000/${req.file.path}`,
      title,
    });

    return res.status(201).json({
      status: "OK",
      message: "Yeni bir image əlavə edildi.",
      blog: newItem,
    });
  } catch (error) {
    return res.status(404).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const allImages = async (req, res) => {
  try {
    const images = await Images.find();

    return res.status(201).json({
      status: "OK",
      count:images.length,
      images,
    });
  } catch (error) {
    return res.status(404).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { id } = await req.params;
    await Images.findByIdAndDelete(id);
    return res.status(201).json({
      status: "OK",
      message: "Şəkil silindi!",
    });
  } catch (error) {
    return res.status(404).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = {
  allImages,
  deleteImage,
  addImage,
};
