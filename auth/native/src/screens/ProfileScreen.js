import React from "react";
import { View, Button } from "react-native";
import { removeToken } from "../tokenUtils";

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };

  _signOutAsync = () => {
    removeToken();
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View>
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }
}

export default ProfileScreen;
