import React from "react";
import { View, Button } from "react-native";
import { saveToken } from "../tokenUtils";

class AuthScreen extends React.Component {
  static navigationOptions = {
    title: "Auth"
  };

  _signInAsync = () => {
    saveToken("token");
    this.props.navigation.navigate("App");
  };

  render() {
    return (
      <View>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }
}

export default AuthScreen;
