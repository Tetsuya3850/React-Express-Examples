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

const { User } = require("./userModel");
const { newToken, protect } = require("./jwtUtils");

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
  async (req, res) => {
    try {
      const user = await User.create(req.body);
      const token = newToken(user);
      return res.status(201).send({ token });
    } catch (error) {
      console.error(error);
      return res.status(400).end();
    }
  }
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
  async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(401).end();
      }

      const match = await user.checkPassword(req.body.password);
      if (!match) {
        return res.status(401).send({ message: "Password Wrong!" });
      }
      const token = newToken(user);
      return res.status(201).send({ token });
    } catch (error) {
      console.error(error);
      return res.status(400).end();
    }
  }
);

app.get("/users", protect, (req, res) => {
  res.status(201).send({ user: req.user });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
