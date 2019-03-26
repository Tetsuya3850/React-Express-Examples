import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet
} from "react-native";
import * as api from "../api";
import { saveToken } from "../tokenUtils";

class SigninScreen extends React.Component {
  static navigationOptions = {
    title: "Signin"
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
        await saveToken(data);
        this.props.navigation.navigate("Home");
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
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.formTitle}>Sign in</Text>
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.textInput}
            value={email}
            placeholder="Email"
            onChangeText={text => this.setState({ email: text })}
          />
        </View>

        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.textInput}
            value={password}
            placeholder="Password"
            onChangeText={text => this.setState({ password: text })}
            onSubmitEditing={this.handleFormSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  formTitle: {
    textAlign: "center",
    fontSize: 30
  },
  inputcontainer: {
    height: 50,
    paddingHorizontal: 15,
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  textInput: {
    flex: 1
  }
});

export default SigninScreen;
