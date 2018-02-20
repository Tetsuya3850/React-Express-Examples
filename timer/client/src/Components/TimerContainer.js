import React from "react";
import { connect } from "react-redux";
import actions from "../actions";
import Todo from "./Todo";

class TimerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remaining_time: this.props.timer.remaining_time,
    };
  }

  render() {
    return <Timer {...this.state, ...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    timer: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleTimer: () => {
      dispatch(actions.toggleTimer());
    },
    onResetTimer: () => {
      dispatch(actions.resetTimer());
    }
  };
};

TimerContainer = connect(mapStateToProps, mapDispatchToProps)(
  TimerContainer
);

export default TimerContainer;
