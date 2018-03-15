import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

class HelloScreen extends Component {
  static navigationOptions = {
    title: "Hello",
    tabBarIcon: ({ tintColor }) => {
      return <MaterialIcons name="home" color={tintColor} size={25} />;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default HelloScreen;
