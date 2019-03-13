import React, { Component } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reAuthUser } from "../reducers";

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = () => {
    this.props.reAuthUser(
      () => this.props.navigation.navigate("App"),
      () => this.props.navigation.navigate("Auth")
    );
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ reAuthUser }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(AuthLoadingScreen);
