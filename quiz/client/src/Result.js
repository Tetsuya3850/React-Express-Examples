import React, { Component } from "react";

class Result extends Component {
  reload = () => {
    window.location.reload();
  };
  render() {
    const { score } = this.props;
    return (
      <div style={styles.container}>
        <h3 style={styles.question}>You got {score} out of 10 right!</h3>
        <br />
        <p style={styles.again} onClick={this.reload}>
          Try Again?
        </p>
      </div>
    );
  }
}

let styles = {
  container: {
    margin: "auto",
    width: 250,
    border: "solid",
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 5,
    textAlign: "center"
  },
  question: {
    margin: 10
  },
  again: {
    margin: 10,
    cursor: "pointer"
  }
};

export default Result;
