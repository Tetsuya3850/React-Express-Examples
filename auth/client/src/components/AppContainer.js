import React, { Component } from "react";

class AppContainer extends Component {
  componentDidMount() {
    this.token = localStorage.getItem("my-token");
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default AppContainer;
