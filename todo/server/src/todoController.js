const Todo = require("./todoModel");

exports.postTodo = async (req, res) => {
  if (!req.body.text) {
    return res.status(400).end();
  }
  const todo = await Todo.create(req.body);
  res.status(200).json(todo);
};

exports.getTodos = async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.status(200).json(todos);
};

exports.deleteTodo = async (req, res) => {
  const deleted = await Todo.deleteOne({ _id: req.params.todoId });
  if (!deleted) {
    return res.status(400).end();
  }
  res.sendStatus(200);
};