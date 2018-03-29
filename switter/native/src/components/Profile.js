import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Profile = ({ name, email, pic, numSweets }) => (
  <View style={styles.container}>
    <Image source={{ uri: pic }} style={styles.profilePic} alt="profile" />
    <View>
      <Text style={styles.author}>{name} Sweets</Text>
      <Text style={styles.author}>{email}</Text>
      <Text style={styles.author}>{numSweets}</Text>
    </View>
  </View>
);

const styles = {
  container: {
    flexDirection: "row"
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10
  },
  author: {
    textDecorationLine: "underline"
  }
};

export default Profile;
