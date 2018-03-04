import React from "react";
import { latencyConverter } from "../helper";
import { Link } from "react-router-dom";

const Sweet = ({
  sweet,
  hasLiked,
  uid,
  handleLikeSweet,
  handleUnlikeSweet
}) => (
  <div style={{ borderStyle: "solid", borderWidth: "0.5px" }}>
    <div style={{ display: "flex", margin: "15px", width: "100%" }}>
      <Link to={`/profile/${sweet.author._id}`}>
        <img
          src={sweet.author.pic}
          style={{ height: "70px", borderRadius: "50%" }}
          alt="profile"
        />
      </Link>
      <div style={{ width: "80%" }}>
        <p>
          <Link to={`/profile/${sweet.author._id}`}>
            <span>{sweet.author.name}</span>
          </Link>
          <span style={{ color: "grey" }}>
            {latencyConverter(Date.now() - Date.parse(sweet.created))}
          </span>
        </p>
        <p>{sweet.text}</p>
        {hasLiked ? (
          <i
            style={{ cursor: "pointer", marginLeft: "5px" }}
            className="fa fa-thumbs-up"
            onClick={() => handleUnlikeSweet(sweet._id, uid)}
          >
            <span style={{ marginLeft: "3px" }}>{sweet.likedByIds.length}</span>
          </i>
        ) : (
          <i
            style={{ cursor: "pointer", marginLeft: "5px" }}
            className="fa fa-thumbs-o-up"
            onClick={() => handleLikeSweet(sweet._id, uid)}
          >
            <span style={{ marginLeft: "3px" }}>{sweet.likedByIds.length}</span>
          </i>
        )}
        <Link to={`/comments/${sweet._id}`} style={{ color: "black" }}>
          <i style={{ marginLeft: "10px" }} className="fa fa-reply">
            <span style={{ marginLeft: "4px" }}>{sweet.comments.length}</span>
          </i>
        </Link>
      </div>
    </div>
  </div>
);

export default Sweet;
