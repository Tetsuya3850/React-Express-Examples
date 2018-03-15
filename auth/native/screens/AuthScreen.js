import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Linking,
  Image,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import queryString from "query-string";
import { AppLoading } from "expo";
import { tokenAuthUser } from "../redux";
import { saveToken } from "../utils";

class AuthScreen extends Component {
  state = {
    isReady: false
  };

  async componentWillMount() {
    let url = await Linking.getInitialURL();
    if (url) {
      this._handleToken(url);
    }

    this.props.dispatch(
      tokenAuthUser(
        () => {
          this.setState({ isReady: true });
        },
        () => {
          this.props.navigation.navigate("profile");
          this.setState({ isReady: true });
        }
      )
    );
  }

  _handleToken = async url => {
    let query = url.replace("exp://exp.host/@tetsuya3850/auth", "");
    const data = queryString.parse(query);
    const token = data.token;
    if (token) {
      await saveToken(token);
    }
  };

  _openWebBrowserAsync = async () => {
    Linking.openURL(
      `https://logsignserver.herokuapp.com/auth/facebook/?linkinguri=exp://exp.host/@tetsuya3850/auth`
    );
  };

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._openWebBrowserAsync}>
          <Image source={require("../assets/fb_signin.png")} />
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

export default connect()(AuthScreen);
