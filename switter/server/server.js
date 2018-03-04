const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT;
const mongoDB = process.env.MONGODB;
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const passport = require("passport");

mongoose.connect(mongoDB);
mongoose.connection.on("error", err => {
  console.error(err.message);
});

require("./userModel");
require("./sweetModel");
require("./config/passport");
const routes = require("./routes");

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use("/", routes);

app.use((err, req, res, next) => {
  console.log(err);
  res.json(err);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
