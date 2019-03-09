const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const jwt_expiry_time = 86400;

const newToken = user => {
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

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }
  const token = bearer.split("Bearer ")[1].trim();
  try {
    const payload = await verifyToken(token);
    const user = await User.findById(payload._id).select("-password");
    req.user = user.toJSON();
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).end();
  }
};

const validateEmail = email => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: [validateEmail, "Invalid address!"]
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = {
  newToken,
  verifyToken,
  protect,
  User
};
