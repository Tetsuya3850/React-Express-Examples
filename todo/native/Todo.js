import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Task = ({ onTogglePress, onDeletePress, task, done }) => (
  <View style={styles.todo}>
    <TouchableOpacity onPress={onTogglePress}>
      <Text style={{ textDecorationLine: done ? "line-through" : "none" }}>
        {task}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onDeletePress}>
      <Text>&#10799;</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "whitesmoke",
    marginBottom: 5,
    padding: 15
  }
});

export default Task;
