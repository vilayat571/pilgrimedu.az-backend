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

const editScholarship = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const upDatedScholarhips = await Scholarship.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    upDatedScholarhips.save();

    const scholarships = await Scholarship.find();

    return res.status(200).json({
      status: "OK",
      message: "Təqaüd proqramı yeniləndi!",
      scholarships,
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
    const { type, region } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (region) filter.region = region;

    const name = req.query.name?.toLowerCase();

    const limitValue = req.query.limit;
    const skipValue = req.query.skip;

    let scholarships;
    if (name?.length > 0) {
      scholarships = await Scholarship.find({
        name: { $regex: name, $options: "i" },
        filter,
      })
        .limit(limitValue)
        .skip(skipValue);
    }

    scholarships = await Scholarship.find(filter)
      .limit(limitValue)
      .skip(skipValue);

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

    const scholarships = await Scholarship.find();

    return res.status(200).json({
      status: "OK",
      message: "Təqaüd proqramı silindi",
      scholarships,
    });
  } catch (error) {
    return res.status(409).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = {
  addScholarship,
  getScholarships,
  deleteScholarship,
  editScholarship,
};
