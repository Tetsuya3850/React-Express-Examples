import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { registerUser } from "../actions";
import v4 from "uuid";

// TODO: When you first fail register, then succeed to, users do not get directed.

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unMatchPwd: "",
      toProfile: false
    };
  }

  handleFormSubmit = e => {
    e.preventDefault();
    if (this.password.value !== this.password2.value) {
      this.setState({ unMatchPwd: "Doesn't match!" });
      return;
    } else {
      this.setState({ unMatchPwd: "" });
    }
    const payLoad = {
      _id: v4(),
      name: this.name.value,
      email: this.email.value,
      password: this.password.value
    };
    this.props.dispatch(
      registerUser(payLoad, () => {
        this.clearForm();
        this.setState(() => ({ toProfile: true }));
      })
    );
  };

  clearForm = () => {
    this.name.value = "";
    this.email.value = "";
    this.password.value = "";
    this.password2.value = "";
  };

  render() {
    if (this.state.toProfile) {
      return <Redirect to="/profile" />;
    }

    const { registerErrors } = this.props;
    const { unMatchPwd } = this.state;

    return (
      <div style={{ margin: "auto", width: 400 }}>
        <form onSubmit={this.handleFormSubmit}>
          <h2 style={{ textAlign: "center" }}>Register</h2>
          <hr />

          <label>User Name</label>
          <input
            type="text"
            ref={node => {
              this.name = node;
            }}
            required
            maxLength="50"
            autoFocus
            style={{ margin: 10 }}
          />
          <span style={{ color: "red" }}>*</span>
          <span style={{ color: "red", marginLeft: 8 }}>
            {registerErrors.name}
          </span>
          <br />

          <label>Email Address</label>
          <input
            type="email"
            ref={node => {
              this.email = node;
            }}
            required
            maxLength="50"
            style={{ margin: 10 }}
          />
          <span style={{ color: "red" }}>*</span>
          <span style={{ color: "red", marginLeft: 8 }}>
            {registerErrors.email}
          </span>
          <br />

          <label>Password</label>
          <input
            type="password"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
            title="Password must be at least 8 characters and include at least 1 uppercase character, 1 lowercase character, and 1 number."
            style={{ margin: 10 }}
            ref={node => {
              this.password = node;
            }}
            required
            minLength="8"
            maxLength="50"
          />
          <span style={{ color: "red" }}>*</span>
          <span style={{ color: "red", marginLeft: 8 }}>
            {registerErrors.password}
          </span>
          <br />

          <label>Confirm Password</label>
          <input
            type="password"
            ref={node => {
              this.password2 = node;
            }}
            required
            maxLength="50"
            style={{ margin: 10 }}
          />
          <span style={{ color: "red" }}>*</span>
          <span style={{ color: "red", marginLeft: 8 }}>{unMatchPwd}</span>
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

Register = connect(mapStateToProps, null)(Register);

export default Register;
