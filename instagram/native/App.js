import React from "react";
import { StyleSheet, View } from "react-native";
import Feed from "./screens/Feed";

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Feed />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
