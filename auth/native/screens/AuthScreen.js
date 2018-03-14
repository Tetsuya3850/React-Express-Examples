import React, { Component } from "react";
import { View, Text, Linking } from "react-native";
import { connect } from "react-redux";

class AuthScreen extends Component {
  _openWebBrowserAsync = async () => {
    Linking.openURL(
      `https://logsignserver.herokuapp.com/auth/facebook/?linkinguri=exp://exp.host/@tetsuya3850/auth`
    );
  };

  render() {
    console.log(this.props);
    return (
      <View>
        <Text
          style={{ color: "blue", textAlign: "center", fontSize: 24 }}
          onPress={this._openWebBrowserAsync}
        >
          Facebook
        </Text>
        <Text>{JSON.stringify(this.props.state.userInfo)}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

AuthScreen = connect(mapStateToProps, null)(AuthScreen);

export default AuthScreen;
