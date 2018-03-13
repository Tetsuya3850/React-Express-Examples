import React, { Component } from "react";
import { View, Text, Linking } from "react-native";

class AuthScreen extends Component {
  render() {
    return (
      <View>
        <Text
          style={{ color: "blue", textAlign: "center", fontSize: 24 }}
          onPress={() => Linking.openURL("http://10.0.1.6:5150/auth/facebook")}
        >
          Facebook
        </Text>
      </View>
    );
  }
}

export default AuthScreen;
