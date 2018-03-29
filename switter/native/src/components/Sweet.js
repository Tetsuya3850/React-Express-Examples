import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { latencyConverter } from "../helper";
import { FontAwesome } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Sweet = ({
  navigation,
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
          navigation.navigate("userProfile", {
            _id: sweet.author._id
          });
        }}
      >
        <Image
          source={{ uri: sweet.author.pic }}
          style={styles.profilePic}
          alt="profile"
        />
      </TouchableOpacity>
      <View style={styles.details}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("userProfile", {
                _id: sweet.author._id
              });
            }}
          >
            <Text style={styles.author}>{sweet.author.name}</Text>
          </TouchableOpacity>
          <Text style={styles.time}>
            {latencyConverter(Date.now() - Date.parse(sweet.created))}
          </Text>
        </View>
        <Text style={styles.text}>{sweet.text}</Text>
        <View style={styles.row}>
          {hasLiked ? (
            <TouchableOpacity
              style={styles.likeReplyContainer}
              onPress={() => handleUnlikeSweet(sweet._id, uid)}
            >
              <FontAwesome style={styles.likeIcon} name="heart" size={18} />
              <Text style={styles.likeNum}>{sweet.likedUserIds.length}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.likeReplyContainer}
              onPress={() => handleLikeSweet(sweet._id, uid)}
            >
              <FontAwesome style={styles.likeIcon} name="heart-o" size={18} />
              <Text style={styles.likeNum}>{sweet.likedUserIds.length}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.likeReplyContainer}
            onPress={() => {
              navigation.navigate("detail", { _id: sweet._id });
            }}
          >
            <FontAwesome
              style={styles.replyIcon}
              name="reply"
              onClick={() => handleLikeSweet(sweet._id, uid)}
              size={18}
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
    borderWidth: 0.3
  },
  sweet: {
    flexDirection: "row",
    margin: 5
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10
  },
  details: {
    justifyContent: "space-between",
    margin: 5
  },
  author: {
    textDecorationLine: "underline"
  },
  text: {
    flexDirection: "row",
    width: SCREEN_WIDTH * 0.7,
    fontSize: 16
  },
  row: {
    flexDirection: "row"
  },
  time: {
    color: "grey"
  },
  likeReplyContainer: {
    flexDirection: "row",
    width: SCREEN_WIDTH * 0.1
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
