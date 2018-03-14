import React, { Component } from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import { connect } from "react-redux";
import queryString from "query-string";
import { socialAuthUser } from "./redux";
import { TabNavigator } from "react-navigation";
import WelcomeScreen from "./screens/WelcomeScreen";
import AuthScreen from "./screens/AuthScreen";
import HelloScreen from "./screens/HelloScreen";
import ProfileScreen from "./screens/ProfileScreen";

class Root extends Component {
  componentDidMount() {
    Linking.getInitialURL().then(url => {
      if (url) {
        this._handleRedirect(url);
      }
    });
  }

  _handleRedirect = async url => {
    let query = url.replace("exp://exp.host/@tetsuya3850/auth", "");
    const data = queryString.parse(query);
    const token = data.token;
    if (token) {
      this.props.dispatch(socialAuthUser(token, () => {}));
    }
  };

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
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});

Root = connect()(Root);

export default Root;
