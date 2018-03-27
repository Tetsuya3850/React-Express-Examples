import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { latencyConverter } from "../helper";
import { FontAwesome } from "@expo/vector-icons";

const Sweet = ({
  sweet,
  hasLiked,
  uid,
  handleLikeSweet,
  handleUnlikeSweet
}) => (
  <View style={styles.container}>
    <View style={styles.sweet}>
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("profile", { _id: sweet.author._id });
        }}
      >
        <Image
          source={{ uri: sweet.author.pic }}
          style={styles.profilePic}
          alt="profile"
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("profile", {
                _id: sweet.author._id
              });
            }}
          >
            <Text>{sweet.author.name}</Text>
          </TouchableOpacity>
          <Text style={styles.time}>
            {latencyConverter(Date.now() - Date.parse(sweet.created))}
          </Text>
        </View>
        <Text style={styles.row}>{sweet.text}</Text>
        <View style={styles.row}>
          {hasLiked ? (
            <View style={styles.row}>
              <FontAwesome
                style={styles.likeIcon}
                name="heart"
                onClick={() => handleUnlikeSweet(sweet._id, uid)}
              />
              <Text style={styles.likeNum}>{sweet.likedUserIds.length}</Text>
            </View>
          ) : (
            <View style={styles.row}>
              <FontAwesome
                style={styles.likeIcon}
                name="heart-o"
                onClick={() => handleLikeSweet(sweet._id, uid)}
              />
              <Text style={styles.likeNum}>{sweet.likedUserIds.length}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              this.props.navigation.navigate("detail", { _id: sweet._id });
            }}
          >
            <FontAwesome
              style={styles.replyIcon}
              name="reply"
              onClick={() => handleLikeSweet(sweet._id, uid)}
            />
            <Text style={styles.replyNum}>{sweet.comments.length}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

const styles = {
  container: {
    borderStyle: "solid",
    borderWidth: 0.5
  },
  sweet: {
    flexDirection: "row",
    margin: 15
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  content: {
    width: "80%"
  },
  row: {
    flexDirection: "row"
  },
  time: {
    color: "grey"
  },
  likeIcon: {
    marginLeft: 5
  },
  likeNum: {
    marginLeft: 3
  },
  replyIcon: {
    marginLeft: 10
  },
  replyNum: {
    marginLeft: 4
  }
};

export default Sweet;
