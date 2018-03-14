import React, { Component } from "react";
import { View, Text, Linking } from "react-native";
import { Constants, WebBrowser, AuthSession } from "expo";
import queryString from "query-string";
import { parseToken } from "../utils";

class AuthScreen extends Component {
  state = {
    redirectData: null
  };

  componentDidMount() {
    Linking.getInitialURL().then(url => {
      if (url) {
        this._handleRedirect(url);
      }
    });
  }

  _handleRedirect = url => {
    let query = url.replace("exp://exp.host/@tetsuya3850/auth", "");
    const data = queryString.parse(query);
    const token = data.token;

    this.setState({ redirectData: token });
  };

  _openWebBrowserAsync = async () => {
    Linking.openURL(
      `https://logsignserver.herokuapp.com/auth/facebook/?linkinguri=exp://exp.host/@tetsuya3850/auth`
    );
  };

  _maybeRenderRedirectData = () => {
    if (!this.state.redirectData) {
      return;
    }

    return <Text>{this.state.redirectData}</Text>;
  };

  render() {
    console.log(
      parseToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTk0ZDM5OTA3OGQzODRlNmE5YzZmNmEiLCJlbWFpbCI6InRldHN1eWEuY2hpY2Fnb0BnbWFpbC5jb20iLCJuYW1lIjoidGV0c3V5YSIsImV4cCI6MTUyMTU4MjIyOCwiaWF0IjoxNTIwOTc3NDI4fQ.GjjO42xW8A28STpcmeurXBzKHiBPEH_54JLoTRFCnNw#_=_"
      )
    );
    return (
      <View>
        <Text
          style={{ color: "blue", textAlign: "center", fontSize: 24 }}
          onPress={this._openWebBrowserAsync}
        >
          Facebook
        </Text>
        {this._maybeRenderRedirectData()}
      </View>
    );
  }
}

export default AuthScreen;
