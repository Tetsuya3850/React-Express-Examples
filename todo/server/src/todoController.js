const Todo = require("./todoModel");

module.exports.postTodo = async (req, res) => {
  if (!req.body.text || req.body.text.length > 25) {
    return res.status(400).end();
  }

  try {
    const todo = await Todo.create(req.body);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).end();
  }
};

module.exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).end();
  }
};

module.exports.deleteTodo = async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.todoId });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};
