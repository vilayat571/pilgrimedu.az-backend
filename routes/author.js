const express = require("express");
const {
  addAuthor,
  getAllAuthors,
  getSingleauthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/author.js");

const router = express.Router();

router.post("/api/v1/authors/add", addAuthor);
router.get("/api/v1/authors", getAllAuthors);
router.get("/api/v1/authors/:id", getSingleauthor);
router.put("/api/v1/authors/update/:id", updateAuthor);
router.delete("/api/v1/authors/delete/:id", deleteAuthor);

module.exports = router;
