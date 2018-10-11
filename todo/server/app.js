const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();
const port = 5150;
const mongoDB = process.env.MONGODB;

mongoose.connect(mongoDB);
mongoose.connection.on("error", err => {
  console.error(err.message);
});

const todoSchema = mongoose.Schema({
  _id: String,
  task: {
    type: String,
    required: [true, "Input required!"],
    maxlength: [25, "Input too long!"]
  },
  created: Date
});
const Todo = mongoose.model("Todo", todoSchema);

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/todo", async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ created: -1 });
    res.status(200).json(todos);
  } catch (e) {
    res.status(500).json(e);
  }
});

app.post("/add", async (req, res, next) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(200).json("saved!");
  } catch (e) {
    res.status(500).json(e);
  }
});

app.post("/toggle", async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.body._id);
    todo.done = !todo.done;
    await todo.save();
    res.status(200).json("toggled!");
  } catch (e) {
    res.status(500).json(e);
  }
});

app.post("/delete", async (req, res, next) => {
  try {
    await Todo.findByIdAndRemove(req.body._id);
    res.status(200).json("deleted!");
  } catch (e) {
    res.status(500).json(e);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json(err);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
