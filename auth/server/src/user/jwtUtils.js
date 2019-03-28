const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const jwt_expiry_time = "3h";

const newToken = user => {
  return jwt.sign({ _id: user._id }, jwt_secret, {
    expiresIn: jwt_expiry_time
  });
};

const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, jwt_secret, (err, payload) => {
      if (err) {
        return reject(err);
      }
      resolve(payload);
    });
  });

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }
  const token = bearer.split("Bearer ")[1].trim();
  try {
    const payload = await verifyToken(token);
    const user = await User.findById(payload._id).select({ password: 0 });
    req.user = user.toJSON();
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).end();
  }
};

module.exports = {
  newToken,
  verifyToken,
  protect
};
