import React, { Component } from "react";

class Quiz extends Component {
  render() {
    return (
      <div>
        <h1>Q: {this.props.quiz[0].question}</h1>
      </div>
    );
  }
}

export default Quiz;
