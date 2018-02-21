import React, { Component } from "react";
import { timeFormatter, toSeconds } from "../helper";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit_mode: false
    };
  }

  editModeOn = () => {
    this.props.onResetTimer();
    this.setState({ edit_mode: true });
    var handles = document.getElementsByName("handles");
    for (var i = 0; i < handles.length; i++) {
      handles[i].setAttribute("disabled", true);
    }
  };

  editModeOff = () => {
    this.h.value = "";
    this.m.value = "";
    this.s.value = "";
    this.setState({ edit_mode: false });
    var handles = document.getElementsByName("handles");
    for (var i = 0; i < handles.length; i++) {
      handles[i].removeAttribute("disabled");
    }
  };

  handleFormSubmit = e => {
    e.preventDefault();
    if (!this.h.value.trim() || !this.m.value.trim() || !this.s.value.trim()) {
      return;
    }
    const seconds = toSeconds(this.h.value, this.m.value, this.s.value);
    this.props.onSetTimer(seconds);
    this.editModeOff();
  };

  render() {
    const {
      remaining_time,
      is_timed,
      onStartTimer,
      onStopTimer,
      onResetTimer
    } = this.props;

    return (
      <div style={styles.container}>
        {this.state.edit_mode ? (
          <form style={styles.editForm} onSubmit={this.handleFormSubmit}>
            <input
              ref={node => {
                this.h = node;
              }}
              size="3"
              type="text"
              autoComplete="off"
              defaultValue="0"
            />
            <label>h</label>
            <input
              ref={node => {
                this.m = node;
              }}
              size="3"
              type="text"
              autoComplete="off"
              defaultValue="0"
            />
            <label>m</label>
            <input
              ref={node => {
                this.s = node;
              }}
              size="3"
              type="text"
              autoComplete="off"
              defaultValue="0"
            />
            <label>s</label>
            <input type="submit" style={{ display: "none" }} />
          </form>
        ) : (
          <p style={styles.timer}>
            {timeFormatter(remaining_time)}{" "}
            <i
              className="fa fa-edit"
              style={styles.editBtn}
              onClick={this.editModeOn}
            />
          </p>
        )}
        <div style={styles.handles}>
          {is_timed ? (
            <button name="handles" onClick={() => onStopTimer()}>
              Stop
            </button>
          ) : (
            <button name="handles" onClick={() => onStartTimer()}>
              Start
            </button>
          )}
          <button name="handles" onClick={() => onResetTimer()}>
            Reset
          </button>
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
