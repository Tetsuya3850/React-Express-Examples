import React, { Component } from "react";
import { View, Button, Text } from "react-native";
import * as api from "../api";
import { removeToken } from "../tokenUtils";

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

  handleSignout = async () => {
    await removeToken;
    this.props.navigation.navigate("Auth");
  };

  render() {
    const { userInfo } = this.state;
    return (
      <View>
        <Text>Name is {userInfo.name}</Text>
        <Text>Email address is {userInfo.email}</Text>
        <Button title="Sign out" onPress={this.handleSignout} />
      </View>
    );
  }
}

export default UserScreen;
