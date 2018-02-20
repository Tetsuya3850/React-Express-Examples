import { connect } from "react-redux";
import actions from "../actions";
import Timer from "./Timer";

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    onSetTimer: set_time => {
      dispatch(actions.setTimer(set_time));
    },
    onStartTimer: () => {
      dispatch(actions.startTimer());
    },
    onStopTimer: () => {
      dispatch(actions.stopTimer());
    },
    onResetTimer: () => {
      dispatch(actions.resetTimer());
    }
  };
};

const TimerContainer = connect(mapStateToProps, mapDispatchToProps)(Timer);

export default TimerContainer;
