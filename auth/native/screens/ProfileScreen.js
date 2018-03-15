import React, { Component } from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { logoutUser } from "../redux";

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
    const { userInfo } = this.props.state;
    return (
      <View style={styles.container}>
        <Text>{userInfo.email}</Text>
        <Text>{userInfo.name}</Text>
        <TouchableOpacity
          onPress={() =>
            this.props.dispatch(
              logoutUser(() => {
                this.props.navigation.navigate("auth");
              })
            )
          }
        >
          <Text>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return { state };
};

ProfileScreen = connect(mapStateToProps, null)(ProfileScreen);

export default ProfileScreen;
