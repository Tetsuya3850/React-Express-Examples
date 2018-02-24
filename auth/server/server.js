const express = require("express");
const app = express();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();
const port = process.env.PORT;
const mongoDB = process.env.MONGODB;
const secret = process.env.SECRET;
const passport = require("passport");

require("./models/user");
require("./config/passport");

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

app.post("/register", async (req, res) => {
  res.json("Resistered!");
});

app.post("/login", async (req, res) => {
  res.json("Logged In!");
});

app.get("/profile/:USERID", async (req, res) => {
  res.json("Here's profile!");
});

app.post("/logout", async (req, res) => {
  res.json("Logged Out!");
});

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({ message: err.name + ": " + err.message });
  }
});

app.use((err, request, response, next) => {
  console.log(err);
  response.send(err);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  mongoose.connect(mongoDB);
});
