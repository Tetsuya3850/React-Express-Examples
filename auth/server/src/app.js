const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { check } = require("express-validator/check");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 8081;
const mongoDB = process.env.MONGODB;

mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.on("error", err => {
  console.error(err.message);
});

const { protect } = require("./userModel");
const userCtrl = require("./userController");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post(
  "/signup",
  [
    check("email")
      .isLength({ min: 1 })
      .trim()
      .escape(),
    check("name")
      .isLength({ min: 1 })
      .trim()
      .escape(),
    check("password")
      .isLength({ min: 1 })
      .escape()
  ],
  userCtrl.signup
);

app.post(
  "/signin",
  [
    check("email")
      .isLength({ min: 1 })
      .trim()
      .escape(),
    check("password")
      .isLength({ min: 1 })
      .escape()
  ],
  userCtrl.signin
);

app.get("/users", protect, (req, res) => {
  res.status(201).send(req.user);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
