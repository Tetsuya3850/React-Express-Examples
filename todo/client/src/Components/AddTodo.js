import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleAddTodo } from "../reducers";

class AddTodo extends Component {
  state = {
    task: ""
  };

  onHandleAddTodo = e => {
    e.preventDefault();
    this.props.handleAddTodo({ task: this.state.task }, () => {
      this.setState({
        task: ""
      });
    });
  };

  render() {
    return (
      <form style={{ textAlign: "center" }} onSubmit={this.onHandleAddTodo}>
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
