const Scholarship = require("../models/scholarships.js");

const addScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.create(req.body);

    return res.status(201).json({
      status: "OK",
      message: "Yeni təqaüd əlavə edildi!",
      scholarship: scholarship,
    });
  } catch (error) {
    return res.status(409).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const getScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();

    return res.status(200).json({
      status: "OK",
      count: scholarships.length,
      scholarships: scholarships,
    });
  } catch (error) {
    return res.status(409).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const deleteScholarship = async (req, res) => {
  try {
    const { id } = req.params;

    await Scholarship.findByIdAndDelete(id);

    return res.status(200).json({
      status: "OK",
      message: "Təqaüd proqramı silindi",
    });
  } catch (error) {
    return res.status(409).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = { addScholarship, getScholarships, deleteScholarship };
