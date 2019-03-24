import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import * as api from "../api";
import { saveToken } from "../tokenUtils";

class AuthScreen extends React.Component {
  static navigationOptions = {
    title: "Auth"
  };

  state = {
    email: "",
    password: "",
    signinError: {}
  };

  handleFormSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      try {
        const payload = { email, password };
        const { data } = await api.signin(payload);
        saveToken(data);
        this.props.navigation.navigate("App");
      } catch (error) {
        console.log(error);
        if (error.response) {
          const { data } = error.response;
          this.setState({ signinError: data });
        }
      }
    }
  };

  render() {
    const { email, password, signinError } = this.state;

    return (
      <View>
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            value={email}
            placeholder="Email"
            onChangeText={text => this.setState({ email: text })}
          />
        </View>

        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            value={password}
            placeholder="Password"
            onChangeText={text => this.setState({ password: text })}
            onSubmitEditing={this.handleFormSubmit}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 15,
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  textInput: {
    flex: 1
  }
});

export default AuthScreen;
