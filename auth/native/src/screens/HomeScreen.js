import React, { Component } from "react";
import { View, Text } from "react-native";
import { removeToken } from "../tokenUtils";

class HomeScreen extends Component {
  static navigationOptions = {
    title: "Home"
  };

  handleSignout = async () => {
    await removeToken;
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View>
        <Text>Home</Text>
        <Button title="Sign out" onPress={this.handleSignout} />
      </View>
    );
  }
}

export default HomeScreen;
