import React from "react";
import { latencyConverter } from "../helper";

const Comments = props => {
  return props.comments.map(comment => (
    <div
      key={comment._id}
      style={{
        borderStyle: "solid",
        borderWidth: "0.2px",
        width: "80%",
        display: "block",
        margin: "auto"
      }}
    >
      <div style={{ display: "flex", margin: "15px" }}>
        <img
          src={comment.author.pic}
          style={{ height: "50px", borderRadius: "50%" }}
          alt="profile"
        />
        <div style={{ width: "80%" }}>
          <p>
            <span style={{ cursor: "pointer" }}>{comment.author.name}</span>
            <span style={{ color: "grey" }}>
              {latencyConverter(Date.now() - Date.parse(comment.created))}
            </span>
          </p>
          <p>{comment.text}</p>
        </div>
      </div>
    </div>
  ));
};

export default Comments;
