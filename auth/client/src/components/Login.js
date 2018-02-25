import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import actions from "../actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      toProfile: false
    };
  }

  handleFormSubmit = async e => {
    e.preventDefault();
    const payLoad = {
      email: this.email.value,
      password: this.password.value
    };
    this.props.dispatch(actions.loginUser(payLoad));
    this.setState(() => ({ toProfile: true }));
    // this.handleStatus(status);
  };

  handleStatus = status => {
    if (status !== "Response Added!") {
      let err = { errors: {} };
      Object.keys(status.errors).map(key => {
        err.errors[key] = status.errors[key].message;
      });
      this.setState(err);
    } else {
      this.clearForm();
    }
  };

  clearForm = () => {
    this.email.value = "";
    this.password.value = "";
  };

  render() {
    if (this.state.toProfile) {
      return <Redirect to="/profile" />;
    }

    return (
      <div style={{ margin: "auto", width: 400 }}>
        <form onSubmit={this.handleFormSubmit}>
          <h2 style={{ textAlign: "center" }}>Login</h2>
          <hr />

          <label>Email Address</label>
          <input
            type="email"
            style={{ margin: 10 }}
            ref={node => {
              this.email = node;
            }}
            required
            maxLength="50"
            autoFocus
          />
          <span style={{ color: "red" }}>*</span>
          <span style={{ color: "red", marginLeft: 8 }}>
            {this.state.errors.email}
          </span>
          <br />

          <label>Password</label>
          <input
            type="password"
            style={{ margin: 10 }}
            ref={node => {
              this.password = node;
            }}
            required
            maxLength="50"
          />
          <span style={{ color: "red" }}>*</span>
          <span style={{ color: "red", marginLeft: 8 }}>
            {this.state.errors.password}
          </span>
          <br />

          <input
            type="submit"
            value="Submit!"
            style={{ display: "block", margin: "auto" }}
          />
        </form>
      </div>
    );
  }
}

Login = connect()(Login);

export default Login;
