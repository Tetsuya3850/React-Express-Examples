const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;

const validateEmail = email => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Required!"],
    validate: [validateEmail, "Invalid address!"],
    maxlength: [50, "Too Long!"],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, "Required!"],
    maxlength: [50, "Too Long!"],
    trim: true
  },
  pic: String,
  likedSweetIds: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Sweet"
    }
  ]
});

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      pic: this.pic,
      likedSweetIds: this.likedSweetIds,
      exp: parseInt(expiry.getTime() / 1000)
    },
    jwt_secret
  );
};

mongoose.model("User", userSchema);
