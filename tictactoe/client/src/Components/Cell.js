import React, { Component } from "react";

class Cell extends Component {
  render() {
    return <div style={styles.container} />;
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
