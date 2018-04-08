import React from "react";
import { Link } from "react-router-dom";

const Item = ({ _id, name, maker, pic, cost, starAverage, numReviews }) => {
  const stars = [];
  for (var i = 0; i < 5; i++) {
    if (i < starAverage) {
      stars.push(<i key={i} className="fa fa-star" aria-hidden="true" />);
    } else {
      stars.push(<i key={i} className="fa fa-star-o" aria-hidden="true" />);
    }
  }
  return (
    <div style={styles.container}>
      <div style={styles.item}>
        <Link to={`/detail/${_id}`}>
          <img src={pic} style={styles.pic} alt="item" />
        </Link>
        <div style={styles.content}>
          <Link to={`/detail/${_id}`}>
            <p style={styles.name}>{name}</p>
          </Link>
          <p style={styles.maker}>by {maker}</p>
          <p style={styles.cost}>${cost}</p>
          <div>
            <span>{stars}</span>
            <span style={styles.numReviews}>{numReviews}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: "10px"
  },
  item: {
    display: "flex",
    margin: "15px",
    width: "100%"
  },
  pic: {
    width: "80px"
  },
  content: {
    margin: "5px"
  },
  name: {
    margin: "3px",
    fontSize: "15px",
    textDecoration: "underline"
  },
  maker: {
    margin: "3px",
    color: "grey",
    fontSize: "13px"
  },
  cost: {
    margin: "3px",
    fontSize: "13px"
  },
  numReviews: {
    margin: "3px"
  }
};

export default Item;
