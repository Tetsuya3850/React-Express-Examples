import React, { Component } from "react";
import * as api from "../api";
import { saveToken } from "../tokenUtils";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    signinError: {}
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      try {
        const payload = { email, password };
        const { data } = await api.signin(payload);
        saveToken(data);
        const { from } = this.props.location.state || {
          from: { pathname: "/" }
        };
        this.props.history.push(from.pathname);
      } catch (error) {
        console.log(error);
        if (error.response) {
          const { data } = error.response;
          this.setState({ signinError: data });
        }
      }
    }
  };

  render() {
    const { email, password, signinError } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <h3>Signin Form</h3>

        <div>
          <div>
            <label>Email Address</label>
            <span> * </span>
            <span style={styles.error}>{signinError.email}</span>
          </div>

          <input
            name="email"
            type="email"
            value={email}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <div>
          <div>
            <label>Password</label>
            <span> * </span>
            <span style={styles.error}>{signinError.password}</span>
          </div>

          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <input type="submit" value="Submit!" />
      </form>
    );
  }
}

const styles = {
  error: {
    color: "red"
  }
};

export default Signin;
