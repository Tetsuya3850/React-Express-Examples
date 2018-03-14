import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TabNavigator } from "react-navigation";
import WelcomeScreen from "./screens/WelcomeScreen";
import AuthScreen from "./screens/AuthScreen";
import HelloScreen from "./screens/HelloScreen";
import ProfileScreen from "./screens/ProfileScreen";

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          hello: { screen: HelloScreen },
          profile: { screen: ProfileScreen }
        })
      }
    });

    return (
      <View style={styles.container}>
        <AuthScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
