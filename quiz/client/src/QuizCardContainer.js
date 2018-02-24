import React, { Component } from "react";
import { quiz } from "./data";
import QuizCard from "./QuizCard";
import Result from "./Result";

class QuizCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz,
      curr_q: 0,
      judge: "",
      score: 0
    };
  }

  clearForm = () => {
    var ele = document.getElementsByName("choice");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
    var btn = document.getElementById("submit");
    btn.removeAttribute("disabled");
  };

  nextQuiz = () => {
    if (this.state.curr_q < 10) {
      this.setState(prevState => ({
        curr_q: prevState.curr_q + 1,
        judge: ""
      }));
    }
    this.clearForm();
  };

  prevQuiz = () => {
    if (this.state.curr_q > 0) {
      this.setState(prevState => ({
        curr_q: prevState.curr_q - 1,
        judge: ""
      }));
    }
    this.clearForm();
  };

  handleAnswer = (e, form) => {
    e.preventDefault();
    const { quiz, curr_q } = this.state;
    const { choice } = form;
    if (quiz[curr_q].answer === parseInt(choice.value, 10)) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        judge: "Correct!"
      }));
    } else {
      this.setState({
        judge: "Wrong!"
      });
    }
    var ele = document.getElementsByName("choice");
    for (var i = 0; i < ele.length; i++) ele[i].checked = false;
    var btn = document.getElementById("submit");
    btn.setAttribute("disabled", true);
  };

  render() {
    if (this.state.curr_q === 10) {
      return (
        <div>
          <Result score={this.state.score} />
        </div>
      );
    } else {
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
}

export default QuizCardContainer;
