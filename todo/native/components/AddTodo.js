import React, { Component } from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleAddTodo } from "../reducers";

class AddTodo extends Component {
  state = {
    task: ""
  };

  onHandleAddTodo = event => {
    event.preventDefault();
    if (this.state.task === "") {
      return;
    }
    const payload = { task: this.state.task };
    const cleanup = () => {
      this.setState({ task: "" });
    };
    this.props.handleAddTodo(payload, cleanup);
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={this.state.task}
          placeholder={"What to get done?"}
          onChangeText={text => this.setState({ task: text })}
          maxLength={25}
          returnKeyType="go"
          onSubmitEditing={this.onHandleAddTodo}
          {...(Platform.OS === "ios"
            ? { clearButtonMode: "while-editing" }
            : {})}
        />
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleAddTodo }, dispatch);
};

AddTodo = connect(
  null,
  mapDispatchToProps
)(AddTodo);

export default AddTodo;
