import React, { Component } from "react";

class Quiz extends Component {
  render() {
    const { quiz, curr_q, onPrev, onNext, onAnswer, judge } = this.props;

    const allChoices = quiz[curr_q].choices.map(choice => (
      <label key={choice} style={styles.choice}>
        <input type="radio" name="choice" value={choice} />
        {choice}
      </label>
    ));
    return (
      <div style={styles.container}>
        <form
          onSubmit={e => onAnswer(e, this.form)}
          ref={form => (this.form = form)}
        >
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

          <h2 style={styles.question}>
            Q{curr_q + 1}: {quiz[curr_q].question}
          </h2>

          {allChoices}

          <button
            type="submit"
            id="submit"
            value="Submit"
            style={styles.submitBtn}
          >
            Submit
          </button>

          <div style={styles.judge}>{judge}</div>
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
  },
  judge: {
    textAlign: "center",
    marginBottom: 10
  }
};

export default Quiz;
