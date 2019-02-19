import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Constants } from "expo";

const Header = () => (
  <View style={styles.container}>
    <Text style={styles.title}>To Do List</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4169E1",
    padding: Constants.statusBarHeight,
    display: "flex",
    alignItems: "center"
  },
  title: {
    fontSize: 18,
    color: "white"
  }
});

export default Header;
