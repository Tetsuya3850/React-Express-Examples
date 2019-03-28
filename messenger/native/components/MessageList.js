import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const keyExtractor = item => item.id.toString();

class MessageList extends React.Component {
  renderMessageItem = ({ item }) => {
    return (
      <View key={item.id} style={styles.messageRow}>
        <View>{this.renderMessageBody(item)}</View>
      </View>
    );
  };

  renderMessageBody = ({ type, text }) => {
    switch (type) {
      case "text":
        return (
          <View style={styles.messageBubble}>
            <Text style={styles.text}>{text}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  render() {
    const { messages } = this.props;

    return (
      <FlatList
        style={styles.container}
        inverted
        data={messages}
        renderItem={this.renderMessageItem}
        keyExtractor={keyExtractor}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "visible"
  },
  messageRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 60
  },
  messageBubble: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgb(16,135,255)",
    borderRadius: 20
  },
  text: {
    fontSize: 18,
    color: "white"
  }
});

export default MessageList;
