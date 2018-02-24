import React, { Component } from "react";

class AuthContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }

  componentDidMount() {
    this.token = localStorage.getItem("my-token");
  }

  render() {
    return <div>Hello!</div>;
  }
}

export default AuthContainer;
