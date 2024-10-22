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
    const users = await UserSchema.find();

    return res.status(200).json({
      status: "OK",
      message: "Bütün istifadəçilər!",
      count: users.length,
      users,
    });
  } catch (error) {
    return res.status(404).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

const removeUser = async (req, res) => {
  try {
    const { id } = await req.params;
    await UserSchema.findByIdAndDelete(id);
    const users = await UserSchema.find();

    return res.status(200).json({
      status: "OK",
      message: "İstifadəçi silinmişdir",
      users,
    });
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
  const passwordUrl = `https://pilgrimmain.netlify.app/shifreyenile/${resetToken}`;

  const message = `Şifrə yeniləmək üçün link: ${passwordUrl}`;

  try {
    // Gmail SMTP configuration for nodemailer

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vilayat571@gmail.com", // Your Gmail address
        pass: "itls wpbx epbh ctql", // The 16-character App Password
      },
    });

    // Email data
    const mailOptions = {
      from: "vilayat571@gmail.com",
      to: user.email, // istifadəçinin emaili
      subject: "Şifrəni Sıfırlama",
      text: message, // ehtiyac varsa sadə mətn mesajı
      html: `<!DOCTYPE html>
<html lang="az">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Şifrəni Sıfırlama</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: Poppins, sans-serif;
        background-color: #f4f4f4;
        color: #333;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        padding: 20px 25px;
        border-radius: 4px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h2 {
        color: #333;
      }
      p {
        line-height: 1.6;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #16022c;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 10px;
        margin-bottom: 15px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Şifrə yeniləmə:</h2>
      <p>Hörmətli ${user.username},</p>
      <p>
        Şifrənizi sıfırlamaq üçün bizə müraciət etdiyiniz üçün bu email sizə
        çatmışdır. Aşağıdakı düyməyə klik edərək şifrənizi yeniləyə bilərsiniz:
      </p>
      <a href="${passwordUrl}" style="color:white" class="button">Şifrəni Sıfırla</a>
      <p>Hörmətlə,<br />Pilgrim EDU MMC</p>
    </div>
  </body>
</html>
`,
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
        message:
          "Linkin müddəti bitmişdir. Zəhmət olmasa e-poçt hesabınıza yenidən link göndərin.",
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

const editUser = async (req, res) => {
  try {
    const { id } = req.params; // Retrieve user ID from route parameters
    const userData = req.body;
    const updatedUser = await UserSchema.findByIdAndUpdate(
      id,
      { $set: userData }, // Update operation using data from req.body
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: "FAILED",
        message: "İstifadəçi tapılmadı",
      });
    }

    const users = await UserSchema.find();

    return res.status(200).json({
      status: "OK",
      message: "İstifadəçi məlumatları yenilənmişdir",
      updatedUser,
      users,
    });
  } catch (error) {
    return res.status(500).json({
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
  removeUser,
  editUser,
};
