import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import getInitials from "../utils/getInitials";

function AuthorRow({ fullname }) {
  return (
    <View style={styles.container}>
      <Avatar size={35} initials={getInitials(fullname)} />
      <Text style={styles.text} numberOfLines={1}>
        {fullname}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10
  },
  text: {
    flex: 1,
    marginHorizontal: 6
  }
});

export default AuthorRow;
