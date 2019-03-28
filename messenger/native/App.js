import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import React from "react";
import { createTextMessage } from "./utils/messageUtils";
import MessageList from "./components/MessageList";
import Status from "./components/Status";
import Toolbar from "./components/Toolbar";

class App extends React.Component {
  state = {
    messages: [createTextMessage("World"), createTextMessage("Hello")]
  };

  handleSubmit = text => {
    const { messages } = this.state;
    this.setState({
      messages: [createTextMessage(text), ...messages]
    });
  };

  render() {
    const { messages } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Status />

        <View style={styles.messageList}>
          <MessageList messages={messages} />
        </View>

        <View style={styles.toolbar}>
          <Toolbar onSubmit={this.handleSubmit} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  messageList: {
    flex: 1,
    backgroundColor: "white"
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.04)",
    backgroundColor: "white"
  }
});

export default App;
