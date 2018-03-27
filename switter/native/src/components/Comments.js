import React from "react";
import { View, Text, Image } from "react-native";
import { latencyConverter } from "../helper";

const Comments = props =>
  props.comments.map(comment => (
    <View key={comment._id} style={styles.container}>
      <View style={styles.comment}>
        <Image
          source={{ uri: comment.author.pic }}
          style={styles.profilePic}
          alt="profile"
        />
        <View style={styles.details}>
          <Text>
            <Text>{comment.author.name}</Text>
            <Text style={styles.time}>
              {latencyConverter(Date.now() - Date.parse(comment.created))}
            </Text>
          </Text>
          <Text style={styles.text}>{comment.text}</Text>
        </View>
      </View>
    </View>
  ));

const styles = {
  container: {
    borderStyle: "solid",
    borderWidth: 0.2
  },
  comment: {
    flexDirection: "row",
    margin: 10
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  details: {
    justifyContent: "space-between",
    margin: 5
  },
  time: {
    color: "grey"
  },
  text: {
    fontSize: 16
  }
};

export default Comments;
