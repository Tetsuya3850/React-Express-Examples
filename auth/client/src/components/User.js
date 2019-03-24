import React, { Component } from "react";
import * as api from "../api";

class User extends Component {
  state = {
    userInfo: {}
  };

  async componentDidMount() {
    try {
      const { data } = await api.getUser(this.props.match.params.userId);
      this.setState({ userInfo: data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { userInfo } = this.state;

    return (
      <div>
        <p>Name is {userInfo.name}</p>
        <p>Email is {userInfo.email}</p>
      </div>
    );
  }
}

export default User;
