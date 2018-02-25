import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toHome: false
    };
  }

  handleFormSubmit = async e => {
    e.preventDefault();
    const payLoad = {
      email: this.email.value,
      password: this.password.value
    };
    this.props.dispatch(
      loginUser(payLoad, () => {
        this.clearForm();
        this.setState(() => ({ toHome: true }));
      })
    );
  };

  clearForm = () => {
    this.email.value = "";
    this.password.value = "";
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (this.state.toHome) {
      return <Redirect to={from} />;
    }

    const { loginErrors } = this.props;

    return (
      <div style={{ margin: "auto", width: 400 }}>
        <form onSubmit={this.handleFormSubmit}>
          <h2 style={{ textAlign: "center" }}>Login</h2>
          <hr />

          <label>Email Address</label>
          <input
            type="email"
            ref={node => {
              this.email = node;
            }}
            required
            maxLength="50"
            autoFocus
            style={{ margin: 10 }}
          />
          <span style={{ color: "red" }}>*</span>
          <span style={{ color: "red", marginLeft: 8 }}>
            {loginErrors.email}
          </span>
          <br />

          <label>Password</label>
          <input
            type="password"
            ref={node => {
              this.password = node;
            }}
            required
            maxLength="50"
            style={{ margin: 10 }}
          />
          <span style={{ color: "red" }}>*</span>
          <span style={{ color: "red", marginLeft: 8 }}>
            {loginErrors.password}
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

const mapStateToProps = state => {
  return state;
};

Login = connect(mapStateToProps, null)(Login);

export default Login;
