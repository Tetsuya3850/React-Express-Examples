const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoDB = process.env.MONGODB;

mongoose.connect(mongoDB);
mongoose.connection.on("connected", function() {
  console.log("Mongoose connected to " + mongoDB);
});
mongoose.connection.on("error", err => {
  console.error(err.message);
});
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose disconnected");
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000)
    },
    "MY_SECRET"
  );
};

mongoose.model("User", userSchema);
