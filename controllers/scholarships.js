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

    const type=req.query?.type;
    const degree=req.query?.degree;
    const name = req.query.name?.toLowerCase();
    const limitValue = req.query.limit;
    const skipValue = req.query.skip;
    let scholarships;
    if (name?.length > 0) {
      scholarships = await Scholarship.find({
        name: { $regex: name, $options: "i" }, degree, type
      })
        .limit(limitValue)
        .skip(skipValue);
    }

    scholarships = await Scholarship.find({degree, type}).limit(limitValue).skip(skipValue);

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
