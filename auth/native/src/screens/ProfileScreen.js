import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { logoutUser } from "../reducer";
import api from "../api";
import { MaterialIcons } from "@expo/vector-icons";
import { registerForPushNotificationsAsync } from "../services/push_notifications";
import { Notifications } from "expo";

class ProfileScreen extends Component {
  static navigationOptions = {
    title: "Profile",
    tabBarIcon: ({ tintColor }) => {
      return <MaterialIcons name="contacts" color={tintColor} size={25} />;
    },
    header: {
      style: {
        marginTop: Platform.OS === "android" ? 24 : 0
      }
    }
  };

  componentDidMount() {
    const { userInfo } = this.props.state;
    registerForPushNotificationsAsync(userInfo._id);
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = notification => {
    const { data: { title, body }, origin } = notification;
    if (origin === "received" && body) {
      Alert.alert(title, body, [{ text: "OK" }]);
    }
  };

  handleSecret = async () => {
    try {
      let { data } = await api.getSecret(this.props.state.userInfo._id);
      Alert.alert("Secret", data.code, [{ text: "OK" }]);
    } catch (e) {
      let { data } = e.response;
      Alert.alert("Error", data.code, [{ text: "OK" }]);
    }
  };

  render() {
    const { userInfo } = this.props.state;
    return (
      <View style={styles.container}>
        <View>
          <Text>Email: {userInfo.email}</Text>
          <Text>Name: {userInfo.name}</Text>
        </View>

        <TouchableOpacity onPress={this.handleSecret}>
          <Text>Click here for a secret message!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            this.props.dispatch(
              logoutUser(() => {
                this.props.navigation.navigate("auth");
              })
            )
          }
        >
          <Text>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return { state };
};

ProfileScreen = connect(mapStateToProps, null)(ProfileScreen);

export default ProfileScreen;
