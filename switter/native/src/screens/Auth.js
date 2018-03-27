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
import { tokenAuthUser } from "../reducer/users";
import { saveToken } from "../helper";

class AuthScreen extends Component {
  state = {
    isReady: false
  };

  checkAuthed = async () => {
    let url = await Linking.getInitialURL();
    if (url) {
      this._handleToken(url);
    }
    this.props.dispatch(
      tokenAuthUser(() => {
        this.props.navigation.navigate("main");
      })
    );
  };

  _handleToken = async url => {
    let query = url.replace("exp://exp.host/@tetsuya3850/switter", "");
    const data = queryString.parse(query);
    const token = data.token;
    if (token) {
      try {
        await saveToken(token);
      } catch (e) {
        console.log(e);
      }
    }
  };

  _openGoogleAuthAsync = () => {
    Linking.openURL(
      `https://switter-server-3850.herokuapp.com/auth/google/?linkinguri=exp://exp.host/@tetsuya3850/switter`
    );
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.checkAuthed}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._openGoogleAuthAsync}>
          <Image source={require("../../assets/google_signin.png")} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center"
  }
});

export default connect()(AuthScreen);
