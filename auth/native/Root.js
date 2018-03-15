import React, { Component } from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import { connect } from "react-redux";
import { socialAuthUser } from "./redux";
import { TabNavigator } from "react-navigation";
import WelcomeScreen from "./screens/WelcomeScreen";
import AuthScreen from "./screens/AuthScreen";
import HelloScreen from "./screens/HelloScreen";
import ProfileScreen from "./screens/ProfileScreen";

class Root extends Component {
  render() {
    const MainNavigator = TabNavigator(
      {
        auth: { screen: AuthScreen },
        main: {
          screen: TabNavigator({
            hello: { screen: HelloScreen },
            profile: { screen: ProfileScreen }
          })
        }
      },
      {
        navigationOptions: { tabBarVisible: false }
      }
    );

    return <MainNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});

Root = connect()(Root);

export default Root;
