import React, { Component } from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";
import { getToken } from "../tokenUtils";

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = () => {
    const userToken = getToken();
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
