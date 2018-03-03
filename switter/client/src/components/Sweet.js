import React from "react";
import { latencyConverter } from "../helper";

const Sweet = ({ sweet, hasLiked, handleLikeSweet, handleUnlikeSweet }) => (
  <div style={{ borderStyle: "solid", borderWidth: "0.5px" }}>
    <div style={{ display: "flex", margin: "15px", width: "100%" }}>
      <img
        src={sweet.author.pic}
        style={{ height: "70px", borderRadius: "50%" }}
        alt="profile"
      />
      <div style={{ width: "80%" }}>
        <p>
          <span style={{ cursor: "pointer" }}>{sweet.author.name}</span>
          <span style={{ color: "grey" }}>
            {latencyConverter(Date.now() - Date.parse(sweet.created))}
          </span>
        </p>
        <p>{sweet.text}</p>
        {hasLiked ? (
          <i
            style={{ cursor: "pointer", marginLeft: "5px" }}
            className="fa fa-thumbs-up"
            onClick={() => handleUnlikeSweet(sweet._id)}
          />
        ) : (
          <i
            style={{ cursor: "pointer", marginLeft: "5px" }}
            className="fa fa-thumbs-o-up"
            onClick={() => handleLikeSweet(sweet._id)}
          />
        )}
        <i
          style={{ cursor: "pointer", marginLeft: "10px" }}
          className="fa  fa-reply"
        />
      </div>
    </div>
  </div>
);

export default Sweet;
