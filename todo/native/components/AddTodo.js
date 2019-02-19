import React, { Component } from "react";
import { TextInput, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleAddTodo } from "../reducers";

class AddTodo extends Component {
  state = {
    task: ""
  };

  onHandleAddTodo = e => {
    e.preventDefault();
    this.props.handleAddTodo({ task: this.state.task }, () => {
      this.setState({
        task: ""
      });
    });
  };

  render() {
    const { text } = this.state;

    return (
      <TextInput
        style={styles.add}
        value={text}
        placeholder={"What to get done?"}
        onChangeText={text => this.setState({ text })}
        maxLength={25}
        returnKeyType="go"
        onSubmitEditing={this.onSubmitEditing}
        {...(Platform.OS === "ios" ? { clearButtonMode: "while-editing" } : {})}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleAddTodo }, dispatch);
};

AddTodo = connect(
  null,
  mapDispatchToProps
)(AddTodo);

export default AddTodo;
