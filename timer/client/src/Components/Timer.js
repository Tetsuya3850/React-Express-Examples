import React, { Component } from "react";
import { timeFormatter, timeDisplay, toSeconds } from "../helper";

class Timer extends Component {
  state = {
    edit_mode: false,
    h: 0,
    m: 0,
    s: 0
  };

  editModeOn = () => {
    this.props.resetTimer();
    const { h, m, s } = timeFormatter(this.props.set_time);
    this.setState({ edit_mode: true, h, m, s });
    const handles = document.getElementsByName("handles");
    for (let handle of handles) {
      handle.setAttribute("disabled", true);
    }
  };

  editModeOff = () => {
    this.setState({ edit_mode: false });
    const handles = document.getElementsByName("handles");
    for (let handle of handles) {
      handle.removeAttribute("disabled");
    }
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { h, m, s } = this.state;
    if (h > 23 || m > 59 || s > 59 || (h === 0 && m === 0 && s === 0)) {
      this.editModeOff();
      return;
    }
    const seconds = toSeconds(h, m, s);
    this.props.setTimer(seconds);
    this.editModeOff();
  };

  render() {
    const {
      remaining_time,
      is_timed,
      startTimer,
      stopTimer,
      resetTimer
    } = this.props;
    const { edit_mode, h, m, s } = this.state;

    return (
      <div style={styles.container}>
        {edit_mode ? (
          <form style={styles.editForm} onSubmit={this.handleFormSubmit}>
            <input
              value={h}
              onChange={e => {
                this.setState({ h: parseInt(e.target.value, 10) });
              }}
              size={3}
              type="number"
              min={0}
              max={23}
            />
            <label>h</label>
            <input
              value={m}
              onChange={e => this.setState({ m: parseInt(e.target.value, 10) })}
              size={3}
              type="number"
              min={0}
              max={59}
              autoFocus
            />
            <label>m</label>
            <input
              value={s}
              onChange={e => this.setState({ s: parseInt(e.target.value, 10) })}
              size={3}
              type="number"
              min={0}
              max={59}
            />
            <label>s</label>
            <input type="submit" style={{ display: "none" }} />
          </form>
        ) : (
          <p style={styles.timer}>
            {timeDisplay(remaining_time)}
            <i
              className="fa fa-edit"
              style={styles.editBtn}
              onClick={this.editModeOn}
            />
          </p>
        )}
        <div style={styles.handles}>
          {is_timed ? (
            <button name="handles" onClick={stopTimer}>
              Stop
            </button>
          ) : (
            <button name="handles" onClick={startTimer}>
              Start
            </button>
          )}
          <button name="handles" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
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
  editForm: {
    textAlign: "center",
    margin: 16
  },
  editBtn: {
    margin: 2
  },
  handles: {
    display: "flex",
    justifyContent: "space-around",
    margin: 10
  }
};

export default Timer;
