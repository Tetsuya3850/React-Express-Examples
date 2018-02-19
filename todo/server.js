const express = require("express");
const app = express();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT;
const mongoDB = process.env.MONGODB;

var todoSchema = mongoose.Schema({
  _id: String,
  task: String,
  done: Boolean
});
var Todo = mongoose.model("Todo", todoSchema);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  mongoose.connect(mongoDB);
});
