import React from "react";

const Cell = ({ move, hasWon, isFair, onMoveClick }) => {
  const handleMoveClick = () => {
    if (hasWon || isFair || move !== null) {
      return;
    }
    onMoveClick();
  };

  let renderState = "";
  if (move === true) {
    renderState = <span style={styles.mark}>&#9675;</span>;
  } else if (move === false) {
    renderState = <span style={styles.mark}>&#10799;</span>;
  }

  return (
    <div style={styles.container} onClick={handleMoveClick}>
      {renderState}
    </div>
  );
};

let styles = {
  container: {
    width: 100,
    height: 100,
    border: "solid",
    borderWidth: "0.02px",
    textAlign: "center",
    cursor: "pointer"
  },
  mark: {
    margin: "auto",
    fontSize: "80px"
  }
};

export default Cell;
