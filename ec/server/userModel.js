const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;

const validateEmail = email => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const orderSchema = new mongoose.Schema({
  cart: mongoose.Schema.Types.Mixed,
  created: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema(
  {
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
    reviewedItems: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Item"
      }
    ],
    cart: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    orders: [orderSchema]
  },
  { minimize: false }
);

userSchema.methods.generateJwt = function() {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      pic: this.pic,
      exp: parseInt(expiry.getTime() / 1000)
    },
    jwt_secret
  );
};

mongoose.model("User", userSchema);
