import React from "react";
import Sweet from "./Sweet";

const FeedContainer = ({ feed }) =>
  feed.map(sweet => <Sweet key={sweet._id} {...sweet} />);

export default FeedContainer;
