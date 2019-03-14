import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleSignin } from "../reducers/authReducer";

class Signin extends Component {
  state = {
    email: "",
    password: ""
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
    const { email, password } = this.state;
    if (email && password) {
      const payload = { email, password };
      this.props.handleSignin(payload, () => {
        this.setState({
          email: "",
          password: ""
        });
        const { from } = this.props.location.state || {
          from: { pathname: "/profile" }
        };
        this.props.history.push(from.pathname);
      });
    }
  };

  render() {
    const { signinError } = this.props;
    const { email, password } = this.state;

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
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
            minLength="8"
            title="Password must be at least 8 characters and include at least 1 uppercase character, 1 lowercase character, and 1 number."
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

const mapStateToProps = ({ auth }) => {
  return auth;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleSignin }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);
