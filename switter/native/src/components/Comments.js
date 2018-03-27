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
        <View style={styles.content}>
          <Text>
            <Text>{comment.author.name}</Text>
            <Text style={styles.time}>
              {latencyConverter(Date.now() - Date.parse(comment.created))}
            </Text>
          </Text>
          <p>{comment.text}</p>
        </View>
      </View>
    </View>
  ));

const styles = {
  container: {
    borderStyle: "solid",
    borderWidth: "0.2px",
    width: "80%",
    display: "block",
    margin: "auto"
  },
  comment: {
    display: "flex",
    margin: "15px"
  },
  profilePic: {
    height: "50px",
    borderRadius: "50%"
  },
  content: {
    width: "80%"
  },
  time: {
    color: "grey"
  }
};

export default Comments;
