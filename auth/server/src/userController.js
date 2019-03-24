const mongoose = require("mongoose");
const User = mongoose.model("User");
const { newToken } = require("./jwtUtils");

exports.signup = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).end();
  }

  try {
    const user = await User.create(req.body);
    const token = newToken(user);
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

  const token = newToken(user);
  return res.status(200).send(token);
};

exports.getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId }).select(
    "-password"
  );

  if (!user) {
    return res.status(400).end();
  }

  res.status(200).send(user);
};
