import React, { Component } from "react";
import google from "../assets/google_signin.png";

class Auth extends Component {
  render() {
    return (
      <div style={{ margin: "auto", width: 400 }}>
        <a
          href="http://localhost:5150/auth/google"
          style={{ textAlign: "center", display: "block" }}
        >
          <img src={google} alt={"googlelogo"} />
        </a>
      </div>
    );
  }
}

export default Auth;
