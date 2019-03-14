import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleSignup } from "../reducers";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    unMatchPwdErr: ""
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({ unMatchPwdErr: "Doesn't match!" });
      return;
    }

    const { name, email, password } = this.state;
    if (name && email && password) {
      const payLoad = { name, email, password };
      this.props.handleSignup(payLoad, () => {
        this.setState({
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
          unMatchPwdErr: ""
        });
        this.props.history.push("/profile");
      });
    }
  };

  render() {
    const { signupError } = this.props;
    const {
      name,
      email,
      password,
      passwordConfirm,
      unMatchPwdErr
    } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <h3>Signup Form</h3>

        <div>
          <div>
            <label>User Name</label>
            <span> * </span>
          </div>

          <input
            name="name"
            type="text"
            value={name}
            onChange={this.handleInputChange}
            required
            autoFocus
          />
        </div>

        <div>
          <div>
            <label>Email Address</label>
            <span> * </span>
            <span style={styles.error}>{signupError.email}</span>
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
          </div>
          <input
            name="password"
            type="password"
            value={password}
            onChange={this.handleInputChange}
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
            minLength="8"
            title="Password must be at least 8 characters and include at least 1 uppercase character, 1 lowercase character, and 1 number."
            required
          />
        </div>

        <div>
          <div>
            <label>Confirm Password</label>
            <span> * </span>
            <span style={styles.error}>{unMatchPwdErr}</span>
          </div>

          <input
            name="passwordConfirm"
            type="password"
            value={passwordConfirm}
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

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleSignup }, dispatch);
};

Signup = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

export default Signup;
