import React, { Component } from "react";
import { TabNavigator } from "react-navigation";
import AuthScreen from "./screens/AuthScreen";
import HelloScreen from "./screens/HelloScreen";
import ProfileScreen from "./screens/ProfileScreen";

class Root extends Component {
  render() {
    const MainNavigator = TabNavigator(
      {
        hello: { screen: HelloScreen },
        profile: { screen: ProfileScreen }
      },
      {
        tabBarPosition: "bottom",
        tabBarOptions: {
          labelStyle: { fontSize: 12 }
        }
      }
    );

    const AppNavigator = TabNavigator(
      {
        auth: { screen: AuthScreen },
        main: { screen: MainNavigator }
      },
      {
        navigationOptions: { tabBarVisible: false }
      }
    );

    return <AppNavigator />;
  }
}

export default Root;
