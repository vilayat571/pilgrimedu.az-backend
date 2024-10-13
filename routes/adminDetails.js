var express = require("express");
const { adminRegister } = require("../controllers/adminDetails");
const router = express.Router();

router.post("/api/v1/admin", adminRegister);

module.exports = router;
