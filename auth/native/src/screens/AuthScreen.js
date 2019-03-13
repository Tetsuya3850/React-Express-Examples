import React from "react";
import { View, Text, Button } from "react-native";

class AuthScreen extends React.Component {
  static navigationOptions = {
    title: "Auth"
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Auth Screen</Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate("Profile")}
        />
      </View>
    );
  }
}

export default AuthScreen;
