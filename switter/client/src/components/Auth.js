import React, { Component } from "react";
import { connect } from "react-redux";
import google from "../assets/google_signin.png";

class Auth extends Component {
  render() {
    return (
      <div style={{ margin: "auto", width: 400 }}>
        <a href="http://localhost:5150/auth/google">
          <img
            src={google}
            alt={"googlelogo"}
            style={{ flexGrow: 1, width: "95%" }}
          />
        </a>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

Auth = connect(mapStateToProps, null)(Auth);

export default Auth;
