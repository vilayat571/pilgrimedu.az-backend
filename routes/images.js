const express = require("express");

const multer = require("multer");
const { addImage, allImages, deleteImage } = require("../controllers/images");

const router = express.Router();

multer({
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./medias/"); // uploads - o deməkdir biz o adda bir folder daxilinə faylları əlavə edəcəyik
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 },
});

router.post("/api/v1/images/add", upload.single("resultImg"), addImage);
router.get("/api/v1/images", allImages);
router.delete("/api/v1/images/delete/:id", deleteImage);

module.exports = router;
