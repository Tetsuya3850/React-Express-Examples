import React, { Component } from "react";
import { quiz } from "./data";
import QuizCard from "./QuizCard";

class QuizCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr_q: 0,
      quiz,
      score: 0,
      result: ""
    };
  }

  nextQuiz = () => {
    if (this.state.curr_q < 9) {
      this.setState(prevState => ({
        curr_q: prevState.curr_q + 1,
        result: ""
      }));
    }
  };

  prevQuiz = () => {
    if (this.state.curr_q > 0) {
      this.setState(prevState => ({
        curr_q: prevState.curr_q - 1,
        result: ""
      }));
    }
  };

  handleAnswer = (e, form) => {
    e.preventDefault();
    const { quiz, curr_q } = this.state;
    const { choice } = form;
    const checkboxArray = Array.prototype.slice.call(choice);
    const checkedCheckboxes = checkboxArray.filter(input => input.checked);
    const checkedCheckboxesValues = checkedCheckboxes.map(input => input.value);
    if (quiz[curr_q].answer === parseInt(checkedCheckboxesValues[0], 10)) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        result: "Correct!"
      }));
    } else {
      this.setState({
        result: "Wrong!"
      });
    }
  };

  render() {
    return (
      <QuizCard
        {...this.state}
        onNext={this.nextQuiz}
        onPrev={this.prevQuiz}
        onAnswer={this.handleAnswer}
      />
    );
  }
}

export default QuizCardContainer;
