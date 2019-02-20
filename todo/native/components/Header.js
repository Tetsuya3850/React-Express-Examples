import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Constants } from "expo";

const Header = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Todo List</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
    paddingTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    height:
      Platform.select({
        android: 56,
        default: 44
      }) + Constants.statusBarHeight
  },
  title: {
    fontSize: 20
  }
});

export default Header;
