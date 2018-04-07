import React, { Component } from "react";
import google from "../assets/google_signin.png";

class Auth extends Component {
  render() {
    return (
      <div>
        <a
          href={`https://switter-server-3850.herokuapp.com/auth/google?linkinguri=${
            window.location.origin
          }/socialauthredirect`}
          style={{ textAlign: "center", display: "block" }}
        >
          <img src={google} alt={"googlelogo"} />
        </a>
      </div>
    );
  }
}

export default Auth;
