import React, { Component } from "react";
import { View, Text, Platform } from "react-native";

class ProfileScreen extends Component {
  static navigationOptions = {
    title: "Profile",
    header: () => {
      return {
        style: {
          marginTop: Platform.OS === "android" ? 24 : 0
        }
      };
    }
  };

  render() {
    return (
      <View>
        <Text>Profile</Text>
      </View>
    );
  }
}

export default ProfileScreen;
