const Blogs = require("../models/blogs.js");

const addBlog = async (req, res) => {
  try {
    const { title, date, description, body, author } = await req.body;

    const newBlog = await Blogs.create({
      thumbnail: `http://localhost:5000/${req.file.path}`,
      title,
      date,
      description,
      body,
      author,
    });

    return res.status(201).json({
      status: "OK",
      path: req.file,
      message: "Yeni bir bloq əlav edildi.",
      blog: newBlog,
    });
  } catch (error) {
    return res.status(409).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const allBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    return res.status(200).json({
      status: "OK",
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    return res.status(409).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = await req.params;
    await Blogs.findByIdAndDelete(id);
    return res.status(200).json({
      status: "OK",
      message: "Bloq silinmişdir",
    });
  } catch (error) {
    return res.status(409).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = {
  addBlog,
  allBlogs,
  deleteBlog,
};
