import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ItemContainer from "./ItemContainer";
import { handleFetchItemDetail, handleAddReview } from "../reducer/itemDetail";

class AddReview extends Component {
  state = {
    star: 1
  };

  componentDidMount() {
    const { itemId, handleFetchItemDetail } = this.props;
    handleFetchItemDetail(itemId);
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { uid, itemId, handleAddReview, history } = this.props;
    const payload = {
      star: this.state.star,
      title: this.title.value,
      content: this.content.value,
      created: Date.now(),
      author: uid
    };
    handleAddReview(itemId, payload, () => history.push(`/detail/${itemId}`));
  };

  render() {
    const { item, isFetching, error, reviewError } = this.props;

    const stars = [];
    for (var i = 1; i <= 5; i++) {
      if (i <= this.state.star) {
        stars.push(
          <i
            key={i}
            id={i}
            className="fa fa-star"
            aria-hidden="true"
            onClick={e => this.setState({ star: e.target.id })}
          />
        );
      } else {
        stars.push(
          <i
            key={i}
            id={i}
            className="fa fa-star-o"
            aria-hidden="true"
            onClick={e => this.setState({ star: e.target.id })}
          />
        );
      }
    }

    return (
      <div>
        {isFetching ? (
          <p style={{ textAlign: "center" }}>LOADING</p>
        ) : (
          <div>
            {item.map(item => (
              <ItemContainer key={item._id} itemId={item._id} />
            ))}
            <p style={{ textAlign: "center", color: "red", marginTop: 10 }}>
              {error}
            </p>
            <form onSubmit={this.handleFormSubmit}>
              <div style={{ marginTop: 10 }}>
                <span>STARS</span>
                <div>{stars}</div>
              </div>
              <div style={{ marginTop: 10 }}>
                <label>
                  TITLE <span style={{ color: "red" }}>*</span>
                  <span style={{ color: "red", marginLeft: "3px" }}>
                    {reviewError["reviews.0.title"]}
                  </span>
                </label>
                <input
                  type="text"
                  style={{ width: "100%", padding: 0 }}
                  ref={node => {
                    this.title = node;
                  }}
                  required
                  maxLength="100"
                  autoFocus
                />
              </div>
              <div style={{ marginTop: 10 }}>
                <label style={{ marginTop: 10 }}>
                  REVIEW <span style={{ color: "red" }}>*</span>
                  <span style={{ color: "red", marginLeft: "3px" }}>
                    {reviewError["reviews.0.content"]}
                  </span>
                </label>
                <textarea
                  style={{
                    width: "100%",
                    marginBottom: 10,
                    padding: 0
                  }}
                  rows="4"
                  ref={node => {
                    this.content = node;
                  }}
                  maxLength="1000"
                />
              </div>
              <button style={styles.submit}>Submit Review</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ items, users, itemDetail }, ownProps) => {
  const itemId = ownProps.match.params.itemId;
  return {
    uid: users.ownInfo._id,
    itemId,
    isFetching: itemDetail.isFetching,
    error: itemDetail.error,
    reviewError: itemDetail.reviewError,
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
  submit: {
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

AddReview = connect(mapStateToProps, mapDispatchToProps)(AddReview);

export default AddReview;
