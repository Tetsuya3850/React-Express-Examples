import React, { Component } from "react";
import { quiz } from "./data";
import QuizCard from "./QuizCard";

class QuizCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr_q: 0,
      quiz
    };
  }

  nextQuiz = () => {
    this.setState(prevState => ({
      curr_q: prevState.curr_q + 1
    }));
  };

  prevQuiz = () => {
    this.setState(prevState => ({
      curr_q: prevState.curr_q - 1
    }));
  };

  render() {
    return (
      <QuizCard {...this.state} onNext={this.nextQuiz} onPrev={this.prevQuiz} />
    );
  }
}

export default QuizCardContainer;
