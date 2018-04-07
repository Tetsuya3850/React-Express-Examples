import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ItemContainer from "./ItemContainer";
import Review from "./Review";
import { handleFetchItemDetail, handleAddReview } from "../reducer/itemDetail";
import { Link } from "react-router-dom";

class ItemDetail extends Component {
  componentDidMount() {
    const { itemId, handleFetchItemDetail } = this.props;
    handleFetchItemDetail(itemId);
  }

  addCart = () => {};

  render() {
    const { isFetching, item, error } = this.props;
    return (
      <div>
        {isFetching ? (
          <p style={{ textAlign: "center" }}>LOADING</p>
        ) : (
          <div>
            {item.map(item => (
              <div key={`div${item._id}`}>
                <ItemContainer itemId={item._id} />
                <button style={styles.cart} onclick={this.addCart}>
                  Add to Cart
                </button>
                <h3 style={styles.detailTitle}>DETAILS</h3>
                <p style={styles.details}>{item.detail}</p>
                <h3 style={styles.reviewTitle}>REVIEWS</h3>
                {item.reviews.map(review => <Review {...review} />)}
                <Link to={`/addreview/${item._id}`}>
                  <button style={styles.review}>Write a Review</button>
                </Link>
              </div>
            ))}
            <p style={{ textAlign: "center", color: "red", marginTop: 10 }}>
              {error}
            </p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ items, itemDetail }, ownProps) => {
  const itemId = ownProps.match.params.itemId;
  return {
    itemId,
    isFetching: itemDetail.isFetching,
    error: itemDetail.error,
    item: items[itemId] ? [items[itemId]] : []
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleFetchItemDetail,
      handleAddReview
    },
    dispatch
  );
};

const styles = {
  cart: {
    display: "block",
    width: "100%",
    border: "none",
    backgroundColor: "#E9AA59",
    padding: "14px 28px",
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "center",
    borderRadius: "10px"
  },
  detailTitle: {
    marginBottom: "5px",
    fontSize: "22px"
  },
  details: {
    margin: "5px",
    fontSize: "15px"
  },
  reviewTitle: {
    fontSize: "22px"
  },
  review: {
    display: "block",
    width: "100%",
    border: "none",
    backgroundColor: "#DADADA",
    padding: "14px 28px",
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "center",
    borderRadius: "10px"
  }
};

ItemDetail = connect(mapStateToProps, mapDispatchToProps)(ItemDetail);

export default ItemDetail;
