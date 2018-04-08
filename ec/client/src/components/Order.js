import React, { Component } from "react";
import ItemContainer from "./ItemContainer";

const formatTime = ISOString => {
  return ISOString.replace(/T/, " ").replace(/\..+/, "");
};

const Order = ({ cart, created }) => (
  <div>
    <p>Ordered at {formatTime(created)}</p>
    {Object.keys(cart).map(itemId => (
      <ItemContainer key={itemId} itemId={itemId} />
    ))}
    <hr />
  </div>
);

export default Order;
