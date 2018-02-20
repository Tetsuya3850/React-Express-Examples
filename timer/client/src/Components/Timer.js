import React, { Component } from "react";

class Timer extends Component {
  render() {
    const {
      set_time,
      remaining_time,
      is_timed,
      onStartTimer,
      onStopTimer,
      onResetTimer,
      onSetTimer
    } = this.props;

    let startOrStop;
    if (is_timed) {
      startOrStop = <p onClick={() => onStopTimer()}>Stop</p>;
    } else {
      startOrStop = <p onClick={() => onStartTimer()}>Start</p>;
    }
    return (
      <div style={styles.container}>
        <p style={styles.timer}> Remaining time is : {remaining_time}</p>
        <div style={styles.handles}>
          {startOrStop}
          <p onClick={() => onResetTimer()}>Reset</p>
        </div>
      </div>
    );
  }
}

let styles = {
  container: {
    margin: "auto",
    width: 250,
    border: "solid",
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 50
  },
  timer: {
    textAlign: "center"
  },
  handles: {
    display: "flex",
    justifyContent: "space-around"
  }
};

export default Timer;
