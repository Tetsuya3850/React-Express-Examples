import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleAddTodo } from "../reducers";

class AddTodo extends Component {
  state = {
    text: ""
  };

  handleChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onHandleAddTodo = event => {
    event.preventDefault();
    event.target.blur();
    const payload = { text: this.state.text };
    const cleanup = () => {
      this.setState({ text: "" });
    };
    this.props.handleAddTodo(payload, cleanup);
  };

  render() {
    return (
      <form onSubmit={this.onHandleAddTodo}>
        <input
          value={this.state.text}
          onChange={this.handleChangeText}
          required
          maxLength={25}
          placeholder="What to get done?"
          type="text"
          autoFocus
        />
        <button type="submit">Go!</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleAddTodo }, dispatch);
};

AddTodo = connect(
  null,
  mapDispatchToProps
)(AddTodo);

export default AddTodo;
