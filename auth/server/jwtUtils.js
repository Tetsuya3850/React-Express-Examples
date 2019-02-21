const jwt = require("jsonwebtoken");
const { User } = require("./userModel");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const jwt_expiry_time = 86400;

module.exports.newToken = user => {
  return jwt.sign({ _id: user._id }, jwt_secret, {
    expiresIn: jwt_expiry_time
  });
};

const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, jwt_secret, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

module.exports.protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "No Token!" });
  }
  let token = req.headers.authorization.split("Bearer ")[1];
  if (!token) {
    return res.status(401).send({ message: "No Token!" });
  }
  try {
    const payload = await verifyToken(token);
    const user = await User.findById(payload._id);
    req.user = user.toJSON();
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
};
