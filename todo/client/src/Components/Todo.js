import React from "react";

const Todo = ({ task, onDeleteClick }) => (
  <li>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <span>{task}</span>
      <span
        onClick={onDeleteClick}
        style={{
          cursor: "pointer"
        }}
      >
        &#10799;
      </span>
    </div>
  </li>
);

export default Todo;
