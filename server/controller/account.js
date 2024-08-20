const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.register = async (req, res, next) => {
  const { email, password, username, fullname, phone } = req.body.data;
  const existingUser = await User.exists({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email da duoc su dung" });
  }
  const user = new User({
    email: email,
    password: password,
    username: username,
    fullName: fullname,
    phoneNumber: phone,
  });

  try {
    await user.save();
    return res.status(200).json({ message: "Thanh cong!" });
  } catch (err) {
    console.log(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const logined = await User.findOne({ email, password });
    if (!logined) {
      return res
        .status(400)
        .json({ message: "ten dang nhap hoac mat khau khong dung" });
    }
    const token = jwt.sign({ userId: logined._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "success", token, userId: logined._id });
  } catch (error) {
    console.log(error);
  }
};
