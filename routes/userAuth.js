const express = require("express");
const {
  registerUser,
  loginUser,
  forgotPassword,
  getAllUsers,
  resetPass,
  removeUser,
  editUser,
} = require("../controllers/userAuth");
const router = express.Router();

router.post("/api/v1/users/add", registerUser);
router.post("/api/v1/users/login", loginUser);
router.post("/api/v1/users/forgotPassword", forgotPassword);
router.put("/api/v1/users/shifreyenile/:token", resetPass);
router.get("/api/v1/users", getAllUsers);
router.delete("/api/v1/users/delete/:id", removeUser);
router.put("/api/v1/users/edit/:id", editUser);

module.exports = router;
