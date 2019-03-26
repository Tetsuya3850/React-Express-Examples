import React from "react";
import { latencyConverter } from "../helper";
import { Link } from "react-router-dom";

const Sweet = ({
  _id,
  author,
  created,
  text,
  likedUserIds,
  comments,
  hasLiked,
  uid,
  handleLikeSweet,
  handleUnlikeSweet
}) => (
  <div style={styles.container}>
    <div style={styles.sweet}>
      <Link to={`/profile/${author._id}`}>
        <img src={author.pic} style={styles.profilePic} alt="profile" />
      </Link>
      <div style={styles.content}>
        <p>
          <Link to={`/profile/${author._id}`}>
            <span>{author.name}</span>
          </Link>
          <span style={styles.time}>
            {latencyConverter(Date.now() - Date.parse(created))}
          </span>
        </p>
        <p>{text}</p>
        {hasLiked ? (
          <i
            style={styles.likeIcon}
            className="fa fa-thumbs-up"
            onClick={() => handleUnlikeSweet(_id, uid)}
          >
            <span style={styles.likeNum}>{likedUserIds.length}</span>
          </i>
        ) : (
          <i
            style={styles.likeIcon}
            className="fa fa-thumbs-o-up"
            onClick={() => handleLikeSweet(_id, uid)}
          >
            <span style={styles.likeNum}>{likedUserIds.length}</span>
          </i>
        )}
        <Link to={`/detail/${_id}`} style={{ color: "black" }}>
          <i style={styles.replyIcon} className="fa fa-reply">
            <span style={styles.replyNum}>{comments.length}</span>
          </i>
        </Link>
      </div>
    </div>
  </div>
);

const styles = {
  container: {
    borderStyle: "solid",
    borderWidth: "0.5px"
  },
  sweet: {
    display: "flex",
    margin: "15px",
    width: "100%"
  },
  profilePic: {
    height: "70px",
    borderRadius: "50%"
  },
  content: {
    width: "80%"
  },
  time: {
    color: "grey"
  },
  likeIcon: {
    cursor: "pointer",
    marginLeft: "5px"
  },
  likeNum: {
    marginLeft: "3px"
  },
  replyIcon: {
    marginLeft: "10px"
  },
  replyNum: {
    marginLeft: "4px"
  }
};

export default Sweet;
