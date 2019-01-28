const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const catchErrWrap = fn => (...args) => fn(...args).catch(args[2]);

app.get(
  "/todos",
  catchErrWrap(async function(req, res, next) {
    const todos = await Todo.find().sort({ created: -1 });
    res.status(200).json(todos);
  })
);

app.post(
  "/todos",
  catchErrWrap(async function(req, res, next) {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.sendStatus(200);
  })
);

app.delete(
  "/todos/:todoId",
  catchErrWrap(async function(req, res, next) {
    await Todo.findByIdAndRemove(req.params.todoId);
    res.sendStatus(200);
  })
);

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
