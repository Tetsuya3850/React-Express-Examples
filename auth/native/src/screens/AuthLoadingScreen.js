import React, { Component } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { isAuthed } from "../tokenUtils";

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = () => {
    if (isAuthed) {
      this.props.navigation.navigate("App");
    } else {
      this.props.navigation.navigate("Auth");
    }
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
