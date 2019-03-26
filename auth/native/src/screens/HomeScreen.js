import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { removeToken } from "../tokenUtils";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  handleSignout = async () => {
    await removeToken();
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign out" onPress={this.handleSignout} />
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

export default HomeScreen;
