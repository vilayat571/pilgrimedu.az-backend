const express = require("express");
const {
  registerUser,
  loginUser,
  forgotPassword,
  getAllUsers,
  resetPass,
} = require("../controllers/userAuth");
const router = express.Router();

router.post("/api/v1/users/add", registerUser);
router.post("/api/v1/users/login", loginUser);
router.post("/api/v1/users/forgotPassword", forgotPassword);
router.post("/api/v1/users/shifreyenile/:token", resetPass);
router.get("/api/v1/users", getAllUsers);

module.exports = router;
