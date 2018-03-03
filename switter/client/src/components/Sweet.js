import React from "react";
import { latencyConverter } from "../helper";

const Sweet = ({ text, author, created }) => (
  <div style={{ borderStyle: "solid", borderWidth: "0.5px" }}>
    <div style={{ display: "flex", margin: "20px" }}>
      <img src={author.pic} style={{ borderRadius: "50%" }} alt="profile" />
      <div>
        <p>
          <span style={{ cursor: "pointer" }}>{author.name}</span>
          <span style={{ color: "grey" }}>
            {latencyConverter(Date.now() - Date.parse(created))}
          </span>
        </p>
        <p>{text}</p>
      </div>
    </div>
  </div>
);

export default Sweet;
