const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }
  const token = bearer.split("Bearer ")[1].trim();
  try {
    const payload = await jwt.verify(token, jwt_secret);
    const user = await User.findById(payload._id).select({ password: 0 });
    req.user = user.toJSON();
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).end();
  }
};

module.exports = {
  protect
};
