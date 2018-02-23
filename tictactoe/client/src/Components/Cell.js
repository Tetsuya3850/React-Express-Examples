import React, { Component } from "react";

class Cell extends Component {
  handleMoveClick = () => {
    const { state, hasWon, isFair, onMoveClick } = this.props;
    if (hasWon || isFair || state === true || state === false) {
      return;
    }
    onMoveClick();
  };

  render() {
    const { state } = this.props;
    let renderState = <span style={styles.mark} />;
    if (state === true) {
      renderState = <span style={styles.mark}>&#9675;</span>;
    } else if (state === false) {
      renderState = <span style={styles.mark}>&#10799;</span>;
    }

    return (
      <div style={styles.container} onClick={this.handleMoveClick}>
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
    borderColor: "black",
    textAlign: "center"
  },
  mark: {
    width: "100%",
    margin: "auto",
    fontSize: "80px"
  }
};

export default Cell;
