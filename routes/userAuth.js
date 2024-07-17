const express = require("express");
const { registerUser, loginUser, forgotPassword, getAllUsers } = require("../controllers/userAuth");
const router = express.Router();

router.post("/api/v1/users/add", registerUser);
router.post("/api/v1/users/login", loginUser);
router.post("/api/v1/users/forgotPassword", forgotPassword);
router.get("/api/v1/users", getAllUsers);


module.exports = router;
