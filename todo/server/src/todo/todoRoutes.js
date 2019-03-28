const express = require("express");
const router = express.Router();
const todoCtrl = require("./todoController");
const { catchErrors } = require("../utils/errorHandlers");

router.post("/", catchErrors(todoCtrl.postTodo));
router.get("/", catchErrors(todoCtrl.getTodos));
router.delete("/:todoId", catchErrors(todoCtrl.deleteTodo));

module.exports = router;
