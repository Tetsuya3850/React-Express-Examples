import React, { Component } from "react";
import { timeFormatter, toSeconds } from "../helper";

let h;
let m;
let s;

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

  handleFormSubmit = e => {
    e.preventDefault();
    if (!h.value.trim() || !m.value.trim() || !s.value.trim()) {
      return;
    }
    const seconds = toSeconds(h.value, m.value, s.value);
    this.props.onSetTimer(seconds);
    h.value = "";
    m.value = "";
    s.value = "";
    this.setState({ edit_mode: false });
    var handles = document.getElementsByName("handles");
    for (var i = 0; i < handles.length; i++) {
      handles[i].removeAttribute("disabled");
    }
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
                h = node;
              }}
              id="h"
              size="3"
              type="text"
              autoComplete="off"
              defaultValue="0"
            />
            <label htmlFor="h">h</label>
            <input
              ref={node => {
                m = node;
              }}
              id="m"
              size="3"
              type="text"
              autoComplete="off"
              defaultValue="0"
            />
            <label htmlFor="m">m</label>
            <input
              ref={node => {
                s = node;
              }}
              id="s"
              size="3"
              type="text"
              autoComplete="off"
              defaultValue="0"
            />
            <label htmlFor="s">s</label>
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
