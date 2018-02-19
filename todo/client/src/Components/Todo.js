import React from "react";

const Todo = ({ onClick, done, task }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: done ? "line-through" : "none"
    }}
  >
    {task}
  </li>
);

export default Todo;
