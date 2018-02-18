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

  render() {
    return <QuizCard {...this.state} />;
  }
}

export default QuizCardContainer;
