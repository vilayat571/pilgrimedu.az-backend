const Blogs = require("../models/blogs.js");
const nodemailer = require("nodemailer");

const addBlog = async (req, res) => {
  try {
    const { title, date, description, body, author } = await req.body;

    const newBlog = await Blogs.create({
      thumbnail: `http://localhost:3001/${req.file.path}`,
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
    const title = req.query.title?.toLowerCase();
    const limitValue = req.query.limit;
    const skipValue = req.query.skip;
    let blogs;
    if (title) {
      blogs = await Blogs.find({
        title: { $regex: title, $options: "i" },
      })
        .limit(limitValue)
        .skip(skipValue);
    } else {
      blogs = await Blogs.find().limit(limitValue).skip(skipValue);
    }

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

const getSingleBlog = async (req, res) => {
  try {
    const { id } = await req.params;
    const singleBlog = await Blogs.findById(id);

    return res.status(200).json({
      status: "OK",
      blog: singleBlog,
    });
  } catch (error) {
    return res.status(409).json({
      status: "FAILED",
      message: error.message,
    });
  }
};





const editAblog = async (req, res) => {
  try {
    const { id } = req.params;

    // Access form data fields via req.body and files via req.file(s)
    const updatedBlog = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      body: req.body.body,
      thumbnail: req.file ? req.file.filename : null, // If you're handling file upload
    };


    const editedBlog = await Blogs.findByIdAndUpdate(
      id,
      updatedBlog,
      { new: true }
    );

    return res.status(200).json({
      status: "OK",
      message: "Blog yeniləndi",
      editedBlog,
    });
  } catch (error) {
    res.status(404).json({
      status: "FAILED",
      message: error.message,
    });
  }
};


module.exports = {
  addBlog,
  allBlogs,
  deleteBlog,
  getSingleBlog,
  editAblog,
};
