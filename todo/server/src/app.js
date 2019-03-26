const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 3001;
const mongoDB =
  process.env.NODE_ENV !== "test"
    ? process.env.MONGODB
    : process.env.MONGODBTEST;

require("./todoModel");
const todoCtrl = require("./todoController");
const { catchErrors } = require("./errorHandlers");

const start = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  if (process.env.NODE_ENV !== "production") {
    app.use(morgan("tiny"));
  }

  app.post("/todos", catchErrors(todoCtrl.postTodo));
  app.get("/todos", catchErrors(todoCtrl.getTodos));
  app.delete("/todos/:todoId", catchErrors(todoCtrl.deleteTodo));

  mongoose.connect(mongoDB, { useNewUrlParser: true });
  mongoose.connection.on("error", err => {
    console.error(err.message);
  });

  const server = app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });

  return server;
};

module.exports = start;
