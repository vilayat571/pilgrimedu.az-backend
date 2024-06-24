const Authors = require("../models/authors.js");

// get authors
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Authors.find();
    return res.status(200).json({
      status: "OK",
      data: authors,
      count: authors.length,
    });
  } catch (error) {
    return res.status(409).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

// get author
const getSingleauthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Authors.findById(id);
    return res.status(200).json({
      status: "OK",
      author: author,
    });
  } catch (error) {
    return res.status(409).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

// add a author
const addAuthor = async (req, res) => {
  try {
    const newAuthor = await Authors.create(req.body);

    return res.status(201).json({
      status: "OK",
      message: "Yeni istifadəçi əlavə edildi!",
      author: newAuthor,
    });
  } catch (error) {
    return res.status(409).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

// delete author
const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    await Authors.findByIdAndDelete(id);
    return res.status(200).json({
      status: "OK",
      message: "Müəllif silinmişdir",
    });
  } catch (error) {
    return res.status(409).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

// update author
const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const updateAuthor = await Authors.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      status: "OK",
      author: updateAuthor,
    });
  } catch (error) {
    return res.status(409).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = {
  getAllAuthors,
  getSingleauthor,
  deleteAuthor,
  updateAuthor,
  addAuthor,
};
