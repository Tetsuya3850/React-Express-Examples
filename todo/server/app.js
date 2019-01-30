const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();
const port = 8081;
const mongoDB = process.env.MONGODB;

mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);
mongoose.connection.on("error", err => {
  console.error(err.message);
});

const todoSchema = mongoose.Schema({
  task: {
    type: String,
    required: [true, "Input required!"],
    maxlength: [25, "Input too long!"]
  },
  created: {
    type: Date,
    default: Date.now
  }
});
const Todo = mongoose.model("Todo", todoSchema);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const catchErrWrap = fn => (...args) => fn(...args).catch(args[2]);

app.get(
  "/todos",
  catchErrWrap(async (req, res, next) => {
    const todos = await Todo.find().sort({ created: -1 });
    res.status(200).json(todos);
  })
);

app.post(
  "/todos",
  catchErrWrap(async (req, res, next) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(200).json(newTodo);
  })
);

app.delete(
  "/todos/:todoId",
  catchErrWrap(async (req, res, next) => {
    await Todo.findOneAndDelete(req.params.todoId);
    res.sendStatus(200);
  })
);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
