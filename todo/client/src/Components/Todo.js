import React from "react";

const Todo = ({ onToggleClick, onDeleteClick, done, task }) => (
  <div>
    <li>
      <p
        onClick={onToggleClick}
        style={{
          textDecoration: done ? "line-through" : "none",
          width: 140,
          display: "inline-block"
        }}
      >
        {task}
      </p>
      <span onClick={onDeleteClick}>&#10799;</span>
    </li>
  </div>
);

export default Todo;
