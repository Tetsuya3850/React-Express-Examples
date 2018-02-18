import React, { Component } from "react";

class Quiz extends Component {
  render() {
    const { quiz, curr_q } = this.props;
    return (
      <div style={styles.container}>
        <div style={styles.navBox}>
          <i className="fa fa-caret-left fa-3x" style={styles.arrowLeft} />
          <i className="fa fa-caret-right fa-3x" style={styles.arrowRight} />
        </div>
        <h2 style={styles.question}>Q: {quiz[curr_q].question}</h2>
      </div>
    );
  }
}

let styles = {
  container: {
    margin: "auto",
    width: 500,
    border: "solid",
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 5
  },
  navBox: {
    display: "flex",
    justifyContent: "space-between"
  },
  arrowLeft: {
    alignSelf: "flex-start",
    margin: 4
  },
  arrowRight: {
    alignSelf: "flex-end",
    margin: 4
  },
  question: {
    margin: 4
  }
};

export default Quiz;
