import React, { Component } from "react";
import { View, Button, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleGetUser, handleSignout } from "../reducers";

class ProfileScreen extends Component {
  static navigationOptions = {
    title: "Profile"
  };

  componentDidMount() {
    this.props.handleGetUser();
  }

  _signOutAsync = () => {
    this.props.handleSignout(() => this.props.navigation.navigate("Auth"));
  };

  render() {
    const { uid, userInfo } = this.props;
    return (
      <View>
        <Text>Your uid is {uid}</Text>
        <Text>Your user name is {userInfo.name}</Text>
        <Text>Your email address is {userInfo.email}</Text>
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleGetUser, handleSignout }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
