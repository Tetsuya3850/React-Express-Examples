import React from "react";
import ItemContainer from "./ItemContainer";
import moment from "moment";

const formatTime = ISOString => {
  return moment(ISOString).format("MMMM Do YYYY, h:mm:ss a");
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
