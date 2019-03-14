import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { handleSignin } from "../reducers";

class AuthScreen extends React.Component {
  static navigationOptions = {
    title: "Auth"
  };

  state = {
    email: "deploy@gmail.com",
    password: "Test3850"
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      const payload = { email, password };
      this.props.handleSignin(payload, () => {
        this.setState({
          email: "",
          password: ""
        });
        this.props.navigation.navigate("App");
      });
    }
  };

  render() {
    const { signinError } = this.props;
    const { email, password } = this.state;

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

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleSignin }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
