import { connect } from "react-redux";
import { setTimer, startTimer, stopTimer, resetTimer } from "../reducer";
import { bindActionCreators } from "redux";
import Timer from "./Timer";

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { setTimer, startTimer, stopTimer, resetTimer },
    dispatch
  );
};

const TimerContainer = connect(mapStateToProps, mapDispatchToProps)(Timer);

export default TimerContainer;
