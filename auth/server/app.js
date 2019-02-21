const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { check } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 8081;
const mongoDB = process.env.MONGODB;
const jwt_secret = process.env.JWT_SECRET;

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.connection.on("error", err => {
  console.error(err.message);
});

require("./userModel");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/register", async (req, res, next) => {
  const user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  try {
    await user.save();
    const token = user.generateJwt();
    res.status(200).json({
      userInfo: user,
      token: token
    });
  } catch (err) {
    res.status(401).json(err);
  }
});

app.post("/login", async (req, res, next) => {
  if (err) {
    res.status(401).json(err);
    return;
  }

  if (user) {
    const token = user.generateJwt();
    res.status(200).json({
      userInfo: user,
      token: token
    });
  } else {
    res.status(401).json(info);
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
