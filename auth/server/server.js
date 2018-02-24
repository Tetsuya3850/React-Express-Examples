const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT;
const jwt_secret = JWT_SECRET;
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const passport = require("passport");

require("./models/user");
require("./config/passport");
const routes = require("./routes/index");

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use(function(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) return next();

  token = token.replace("Bearer ", "");

  jwt.verify(token, jwt_secret, function(err, user) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Please register Log in using a valid email to submit posts"
      });
    } else {
      req.user = user;
      next();
    }
  });
});

app.use("/", routes);

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({ message: err.name + ": " + err.message });
  }
});

app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  mongoose.connect(mongoDB);
});
