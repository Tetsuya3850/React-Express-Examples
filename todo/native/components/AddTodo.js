import React, { Component } from "react";
import { TextInput, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";
import { addNewTodo } from "../redux";

class AddTodo extends Component {
  state = {
    text: ""
  };

  onSubmitEditing = () => {
    const { text } = this.state;
    const { dispatch } = this.props;
    if (!text) return;
    dispatch(
      addNewTodo(text, () => {
        this.setState({ text: "" });
      })
    );
  };

  render() {
    const { text } = this.state;
    const platformConfigs =
      Platform.OS === "ios" ? { clearButtonMode: "while-editing" } : {};

    return (
      <TextInput
        style={styles.add}
        value={text}
        placeholder={"What to get done?"}
        onChangeText={text => this.setState({ text })}
        maxLength={30}
        returnKeyType="go"
        onSubmitEditing={this.onSubmitEditing}
        {...platformConfigs}
      />
    );
  }
}

const styles = StyleSheet.create({
  add: {
    padding: 15,
    height: 50
  }
});

AddTodo = connect()(AddTodo);

export default AddTodo;
