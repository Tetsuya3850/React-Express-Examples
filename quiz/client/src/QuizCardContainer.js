import React, { Component } from "react";
import { quiz } from "./data";
import QuizCard from "./QuizCard";

class QuizCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr_q: 0,
      quiz,
      score: 0
    };
  }

  nextQuiz = () => {
    if (this.state.curr_q < 9) {
      this.setState(prevState => ({
        curr_q: prevState.curr_q + 1
      }));
    }
  };

  prevQuiz = () => {
    if (this.state.curr_q > 0) {
      this.setState(prevState => ({
        curr_q: prevState.curr_q - 1
      }));
    }
  };

  handleAnswer = (e, choice) => {
    e.preventDefault();
    const { quiz, curr_q } = this.state;
    if (quiz[curr_q].answer === choice) {
      this.setState(prevState => ({
        score: prevState.score + 1
      }));
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
