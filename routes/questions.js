const express = require("express");
const { addQuestion, getAllquestions, getSinglequestion, deleteQuestion } = require("../controllers/questions.js");

const router = express.Router();

router.post("/api/v1/questions/add", addQuestion);
router.get("/api/v1/questions", getAllquestions);
router.get("/api/v1/questions/:id", getSinglequestion);
router.delete("/api/v1/questions/delete/:id", deleteQuestion);

module.exports = router;
