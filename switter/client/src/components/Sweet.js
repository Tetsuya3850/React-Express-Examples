import React from "react";
import { latencyConverter } from "../helper";

const Sweet = ({ sweet }) => (
  <div style={{ borderStyle: "solid", borderWidth: "0.5px" }}>
    <div style={{ display: "flex", margin: "20px" }}>
      <img
        src={sweet.author.pic}
        style={{ borderRadius: "50%" }}
        alt="profile"
      />
      <div>
        <p>
          <span style={{ cursor: "pointer" }}>{sweet.author.name}</span>
          <span style={{ color: "grey" }}>
            {latencyConverter(Date.now() - Date.parse(sweet.created))}
          </span>
        </p>
        <p>{sweet.text}</p>
      </div>
    </div>
  </div>
);

export default Sweet;
