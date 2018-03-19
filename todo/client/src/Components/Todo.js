import React from "react";

const Todo = ({ onToggleClick, onDeleteClick, done, task }) => (
  <li>
    <div style={styles.todo}>
      <p
        onClick={onToggleClick}
        style={{
          textDecoration: done ? "line-through" : "none",
          cursor: "pointer"
        }}
      >
        {task}
      </p>
      <p onClick={onDeleteClick} style={styles.cross}>
        &#10799;
      </p>
    </div>
  </li>
);

const styles = {
  todo: {
    display: "flex",
    justifyContent: "space-between"
  },
  cross: {
    cursor: "pointer"
  }
};

export default Todo;
