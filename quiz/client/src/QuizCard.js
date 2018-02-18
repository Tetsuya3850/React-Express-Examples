import React, { Component } from "react";

class Quiz extends Component {
  render() {
    const { quiz, curr_q, onPrev, onNext, onAnswer } = this.props;
    const allChoices = quiz[curr_q].choices.map(choice => (
      <label key={choice} style={styles.choice}>
        <input type="checkbox" name="checkbox" value="value" />
        {choice}
      </label>
    ));
    return (
      <div style={styles.container}>
        <form onSubmit={e => onAnswer(e, 2)}>
          <div style={styles.navBox}>
            <i
              className="fa fa-caret-left fa-3x"
              style={styles.arrowLeft}
              onClick={onPrev}
            />
            <i
              className="fa fa-caret-right fa-3x"
              style={styles.arrowRight}
              onClick={onNext}
            />
          </div>

          <h2 style={styles.question}>Q: {quiz[curr_q].question}</h2>

          {allChoices}

          <button type="submit" value="Submit" style={styles.submitBtn}>
            Submit
          </button>
        </form>
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
    borderRadius: 5
  },
  navBox: {
    display: "flex",
    justifyContent: "space-between"
  },
  arrowLeft: {
    alignSelf: "flex-start",
    margin: 4,
    cursor: "pointer"
  },
  arrowRight: {
    alignSelf: "flex-end",
    margin: 4,
    cursor: "pointer"
  },
  question: {
    margin: 10
  },
  choice: {
    display: "block",
    margin: 10
  },
  submitBtn: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10
  }
};

export default Quiz;
