const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.signup = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).end();
  }

  try {
    const user = await User.create(req.body);
    const token = user.newToken();
    return res.status(200).send(token);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ email: "Address already in use!" });
    } else {
      return res.status(500).end();
    }
  }
};

exports.signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).end();
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).send({ email: "Email not found!" });
  }

  const match = await user.checkPassword(req.body.password);
  if (!match) {
    return res.status(401).send({ password: "Password wrong!" });
  }

  const token = user.newToken();
  return res.status(200).send(token);
};

exports.getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId }).select({
    password: 0
  });
  if (!user) {
    return res.status(400).end();
  }

  res.status(200).send(user);
};

/*
exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email not Found!");
  }
  user.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswrodExpires = Date.now() + 1 * 60 * 60 * 1000;
  await user.save();
  const resetURL = ``;
  await mail.send({ user, subject: "Password Reset", resetURL });
  res.status(200).send("You have been emailed a password reset link");
};

exports.updatePassword = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswrodExpires: { $gt: Date.now() }
  });
  if (!user) {
    return res.status(400).send("Token is invalid or have expired");
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswrodExpires = undefined;
  const updateUser = await user.save();
  const token = newToken(updateUser);
  return res.status(200).send(token);
};
*/
