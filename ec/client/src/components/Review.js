import React from "react";

const Review = ({ author, star, title, content }) => {
  const stars = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= star) {
      stars.push(
        <i key={i} id={i} className="fa fa-star" aria-hidden="true" />
      );
    } else {
      stars.push(
        <i key={i} id={i} className="fa fa-star-o" aria-hidden="true" />
      );
    }
  }

  return (
    <div>
      <div>
        <span>{author.name}</span> {stars}
      </div>
      <div style={{ margin: "10px" }}>{content}</div>
      <hr />
    </div>
  );
};

export default Review;
