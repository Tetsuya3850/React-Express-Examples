import React from "react";

const Todo = ({ onDeleteClick, done, task }) => (
  <li>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <p
        style={{
          textDecoration: done ? "line-through" : "none",
          cursor: "pointer"
        }}
      >
        {task}
      </p>
      <p
        onClick={onDeleteClick}
        style={{
          cursor: "pointer"
        }}
      >
        &#10799;
      </p>
    </div>
  </li>
);

export default Todo;
