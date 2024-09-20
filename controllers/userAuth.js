const UserSchema = require("../models/userAuthSchema.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const registerUser = async (req, res) => {
  const { username, email, password, degree, phone, service, status } =
    req.body;
  const user = await UserSchema.findOne({ email });

  if (!user) {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await UserSchema.create({
      username,
      email,
      password: passwordHash,
      degree,
      phone,
      service,
      status,
    });
    const token = jwt.sign({ id: newUser._id }, "SECRETTOKEN", {
      expiresIn: "1h",
    });
    return res.status(201).json({
      status: "OK",
      message: "Uğurla qeydiyyatdan keçdiniz! 🎉",
      user: newUser,
      token,
    });
  } else {
    return res.status(504).json({
      status: "FAILED",
      message: "Bu epoçt adresi ilə bir istifadəçı mövcuddur!",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserSchema.findOne({ email });
  if (!user) {
    return res.status(504).json({
      status: "FAILED",
      message: "Belə bir istifadəçi yoxdur!",
    });
  }

  const comparedPassword = await bcrypt.compare(password, user.password);

  if (!comparedPassword) {
    return res.status(504).json({
      status: "FAILED",
      message: "Yanlış şifrə daxil etmisiniz!",
    });
  }

  const token = jwt.sign({ id: user._id }, "SECRETTOKEN", {
    expiresIn: "1h",
  });

  return res.status(200).json({
    status: "OK",
    message: "İstifadəçi hesaba daxil olmuşdur!",
    user,
    token,
  });
};

const getAllUsers = async (req, res) => {
  try {
  } catch (error) {
    return res.status(404).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

// forgotpassword does not work on postman
const forgotPassword = async (req, res) => {
  const user = await UserSchema.findOne({ email: req.body.email });

  if (!user) {
    return res.status(504).json({
      status: "FAILED",
      message: "Belə bir istifadəçi mövcud deyildir!",
    });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = new Date(Date.now() + 5 * 60 * 1000);

  await user.save({ validateBeforeSave: false });
  const passwordUrl = `http://localhost:5173/shifreyenile/${resetToken}`;

  const message = ` Reset password : ${passwordUrl}`;

  try {
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "8db7a6c31b8588",
        pass: "b1276e32ef267e",
      },
    });

    // Email data
    const mailOptions = {
      from: "vilayat571@gmail.com",
      to: user.email,
      subject: "Reset password",
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      status: "OK",
      message: "Mailinizi kontrol ediniz!",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return res.status(504).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const resetPass = async (req, res) => {
  try {
    const resetToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await UserSchema.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(504).json({
        status: "FAILED",
        message: "Token uyğun deyil!",
      });
    }

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save();

    const token = jwt.sign({ id: user._id }, "SECRETTOKEN", {
      expiresIn: "1h",
    });
    return res.status(200).json({
      status: "OK",
      message: "Şifrə yeniləndi!",
      user,
      token,
    });
  } catch (error) {
    return res.status(504).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  getAllUsers,
  resetPass,
};
