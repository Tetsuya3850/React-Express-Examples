import React, { Component } from "react";
import { TextInput, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { addNewTodo } from "../redux";

class AddTodo extends Component {
  state = {
    text: ""
  };

  onChangeText = text => this.setState({ text });

  onSubmitEditing = () => {
    const { text } = this.state;
    const { dispatch } = this.props;
    if (!text) return;
    dispatch(addNewTodo(text));
    this.setState({ text: "" });
  };

  render() {
    const { text } = this.state;

    return (
      <TextInput
        style={styles.add}
        value={text}
        placeholder={"What to get done?"}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmitEditing}
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
