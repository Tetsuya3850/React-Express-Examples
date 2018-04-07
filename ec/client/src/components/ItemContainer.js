import { connect } from "react-redux";
import Item from "./Item";

const mapStateToProps = ({ items }, ownProps) => {
  const item = items[ownProps.itemId];
  const numReviews = item.reviews.length;
  let starTotal = 0;
  item.reviews.forEach(review => {
    starTotal += review.star;
  });
  const starAverage = numReviews !== 0 ? Math.round(starTotal / numReviews) : 0;
  return { ...item, numReviews, starAverage };
};

export default connect(mapStateToProps, null)(Item);
