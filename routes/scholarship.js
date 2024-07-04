const express = require("express");
const {
  addScholarship,
  getScholarships,
  deleteScholarship,
} = require("../controllers/scholarships");

const router = express.Router();

router.post("/api/v1/scholarships/add", addScholarship);
router.get("/api/v1/scholarships", getScholarships);
router.delete("/api/v1/scholarships/delete/:id", deleteScholarship);

module.exports = router;
