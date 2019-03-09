import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleSignin } from "../reducers";

class Signin extends Component {
  state = {
    email: "",
    password: ""
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
            type="email"
            value={email}
            onChange={event => this.setState({ email: event.target.value })}
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
            type="password"
            value={password}
            onChange={event => this.setState({ password: event.target.value })}
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

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleSignin }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);
