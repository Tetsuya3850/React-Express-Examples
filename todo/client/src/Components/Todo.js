import React from "react";

const Todo = ({ task, onDeleteClick }) => (
  <li>
    <div style={styles.container}>
      <span>{task}</span>
      <span onClick={onDeleteClick} style={styles.cross}>
        &#10799;
      </span>
    </div>
  </li>
);

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between"
  },
  cross: {
    cursor: "pointer"
  }
};

export default Todo;
