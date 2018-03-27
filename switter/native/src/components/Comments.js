import React from "react";
import { latencyConverter } from "../helper";

const Comments = props =>
  props.comments.map(comment => (
    <div key={comment._id} style={styles.container}>
      <div style={styles.comment}>
        <img src={comment.author.pic} style={styles.profilePic} alt="profile" />
        <div style={styles.content}>
          <p>
            <span style={styles.author}>{comment.author.name}</span>
            <span style={styles.time}>
              {latencyConverter(Date.now() - Date.parse(comment.created))}
            </span>
          </p>
          <p>{comment.text}</p>
        </div>
      </div>
    </div>
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
  author: {
    cursor: "pointer"
  },
  time: {
    color: "grey"
  }
};

export default Comments;
