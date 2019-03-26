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

class SignupScreen extends React.Component {
  static navigationOptions = {
    title: "Signup"
  };

  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    unMatchPwdErr: "",
    signupError: {}
  };

  handleFormSubmit = async event => {
    event.preventDefault();
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({ unMatchPwdErr: "Doesn't match!" });
      return;
    }
    const { name, email, password } = this.state;
    if (name && email && password) {
      const payload = { name, email, password };
      try {
        const { data } = await api.signup(payload);
        await saveToken(data);
        this.props.navigation.navigate("Home");
      } catch (error) {
        if (error.response) {
          console.log(error);
          const { data } = error.response;
          this.setState({ signupError: data });
        }
      }
    }
  };

  render() {
    const {
      name,
      email,
      password,
      passwordConfirm,
      unMatchPwdErr,
      signupError
    } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.formTitle}>Sign up</Text>
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.textInput}
            value={name}
            placeholder="Name"
            onChangeText={text => this.setState({ name: text })}
          />
        </View>

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
          />
        </View>

        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.textInput}
            value={passwordConfirm}
            placeholder="Confirm Password"
            onChangeText={text => this.setState({ passwordConfirm: text })}
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

export default SignupScreen;
