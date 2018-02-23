import React, { Component } from "react";

class Cell extends Component {
  render() {
    const { pos, state, turn, onMoveClick } = this.props;
    let renderState = null;
    if (state === true) {
      renderState = <span>&#9675;</span>;
    } else if (state === false) {
      renderState = <span>&#10799;</span>;
    }

    return (
      <div style={styles.container} onClick={onMoveClick}>
        {renderState}
      </div>
    );
  }
}

let styles = {
  container: {
    width: 100,
    height: 100,
    border: "solid",
    borderWidth: "0.02px",
    borderColor: "black"
  }
};

export default Cell;
