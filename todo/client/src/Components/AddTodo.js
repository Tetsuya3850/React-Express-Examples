import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleAddTodo } from "../reducers";

class AddTodo extends Component {
  state = {
    task: ""
  };

  onHandleAddTodo = event => {
    event.preventDefault();
    event.target.blur();
    const payload = { task: this.state.task };
    const cleanup = () => {
      this.setState({ task: "" });
    };
    this.props.handleAddTodo(payload, cleanup);
  };

  render() {
    return (
      <form onSubmit={this.onHandleAddTodo}>
        <input
          value={this.state.task}
          onChange={e => this.setState({ task: e.target.value })}
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
