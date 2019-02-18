const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { check } = require("express-validator/check");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 8081;
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
    required: true,
    trim: true,
    maxlength: 25
  },
  createdAt: {
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

app.get("/todos", async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
});

app.post(
  "/todos",
  [
    check("task")
      .isLength({ min: 1, max: 25 })
      .trim()
      .escape()
  ],
  async (req, res, next) => {
    try {
      const todo = await Todo.create(req.body);
      res.status(200).json(todo);
    } catch (err) {
      next(err);
    }
  }
);

app.delete("/todos/:todoId", async (req, res, next) => {
  try {
    await Todo.deleteOne(req.params.todoId);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
