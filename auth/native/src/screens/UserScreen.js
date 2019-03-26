import React, { Component } from "react";
import { View, Button, Text } from "react-native";
import * as api from "../api";

class UserScreen extends Component {
  static navigationOptions = {
    title: "User"
  };

  state = {
    userInfo: {}
  };

  async componentDidMount() {
    try {
      const { data } = await api.getUser();
      this.setState({ userInfo: data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { userInfo } = this.state;
    return (
      <View>
        <Text>Name is {userInfo.name}</Text>
        <Text>Email address is {userInfo.email}</Text>
      </View>
    );
  }
}

export default UserScreen;
