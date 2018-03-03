import React from "react";
import Sweet from "./Sweet";

const SweetContainer = ({ sweets }) =>
  sweets.map(sweet => <Sweet key={sweet._id} {...sweet} />);

export default SweetContainer;
