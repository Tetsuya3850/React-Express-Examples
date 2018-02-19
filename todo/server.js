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

app.get("/todo", async (req, res) => {
  const todos = await Todo.Find();
  res.json(todos);
});

app.post("/add", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.json("Todo Saved!");
});

app.post("/toogle", async (req, res) => {
  const todo = await Counter.findOne({ _id: req.body._id });
  todo.done = !todo.done;
  await todo.save();
  res.json("toggled!");
});

app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  mongoose.connect(mongoDB);
});
