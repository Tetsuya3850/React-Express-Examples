import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Todo = ({ onDeletePress, text }) => (
  <View style={styles.container}>
    <Text>{text}</Text>
    <TouchableOpacity
      onPress={onDeletePress}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
    >
      <Text>X</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "whitesmoke",
    marginBottom: 5,
    padding: 15
  }
});

export default Todo;
