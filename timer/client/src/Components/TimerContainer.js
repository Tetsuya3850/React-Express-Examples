import React from "react";
import { connect } from "react-redux";
import actions from "../actions";
import Todo from "./Todo";

class TimerContainer extends Component {
  render() {
    return <Timer {...this.state, ...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleTodo: _id => {
      dispatch(actions.toggleTodo(_id));
    },
    onDeleteTodo: _id => {
      dispatch(actions.deleteTodo(_id));
    }
  };
};

TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(
  TodoListContainer
);

export default TodoListContainer;
