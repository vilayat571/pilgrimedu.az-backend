const Admin = require("../models/adminDetails.js");
const jwt = require("jsonwebtoken");

const adminRegister = async (req, res) => {
  const { username, password } = req.body; // Use req.body instead of req.query
  const user = await Admin.findOne({ username });

  if (user) {
    if (user.password === password) {
      const token = jwt.sign({ id: user._id }, "SECRETTOKEN", {
        expiresIn: "1h",
      });
      return res.status(200).json({
        status: "OK",
        message: "Uğurla sistemə daxil oldunuz! 🎉",
        token,
      });
    } else {
      return res.status(401).json({
        status: "FAILED",
        message:
          "Giriş cəhdi uğursuzdur. Zəhmət olmasa məlumatları doğru daxil edin",
      });
    }
  } else {
    return res.status(404).json({
      status: "FAILED",
      message: "Belə bir istifadəçi yoxdur",
    });
  }
};

module.exports = {
  adminRegister,
};
