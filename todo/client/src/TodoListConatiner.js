import { connect } from "react-redux";
import actions from "../actions";
import TodoList from "./TodoList";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onIncrementCount: () => {
      dispatch(incrementCount(ownProps._id));
    },
    onDecrementCount: () => {
      dispatch(decrementCount(ownProps._id));
    },
    onDeleteCounter: () => {
      dispatch(deleteCounter(ownProps._id));
    }
  };
};

const TodoListContainer = connect(null, mapDispatchToProps)(Counter);

export default TodoListContainer;
