const Blogs = require("../models/blogs.js");

const addBlog = async (req, res) => {
  try {
    const { title, date, description, body, author } = req.body;

    const newBlog = await Blogs.create({
      thumbnail: req.file ? `http://localhost:3000/${req.file.path}` : "",
      title,
      date,
      description,
      body,
      author,
    });

    console.log(req.file.path)

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

const deleteAll = async (req, res) => {
  try {
    await Blogs.deleteMany();

    return res.status(200).json({
      message: "Bütün bloqlar uğurla silinmişdir!",
      status: "OK",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Bloqlar silinərkən xəta baş verdi!",
      status: "ERROR",
      error: error.message,
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
    const { id } = req.params;

    const deletedBlog = await Blogs.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({
        status: "FAILED",
        message: "Bloq tapılmadı",
      });
    }

    return res.status(200).json({
      status: "OK",
      message: "Bloq silinmişdir",
      blog: deletedBlog,
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
    const { id } = req.params;
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

    const existingBlog = await Blogs.findById(id);

    const newThumbnail = req.file
      ? `https://pilgrimedu.az/${req.file.path}`
      : existingBlog.thumbnail;

    const updatedBlog = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      body: req.body.body,
      thumbnail: newThumbnail,
    };

    const editedBlog = await Blogs.findByIdAndUpdate(id, updatedBlog, {
      new: true,
    });

    const allBlogs = await Blogs.find();

    return res.status(200).json({
      status: "OK",
      message: "Blog yeniləndi",
      editedBlog,
      blogs: allBlogs,
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
  deleteAll,
};
