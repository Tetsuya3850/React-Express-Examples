import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ItemContainer from "./ItemContainer";
import { handleFetchItemDetail, handleEditReview } from "../reducer/itemDetail";

class EditReview extends Component {
  state = {
    star: this.props.review.star,
    title: this.props.review.title,
    content: this.props.review.content
  };

  componentDidMount() {
    const { itemId, handleFetchItemDetail } = this.props;
    handleFetchItemDetail(itemId);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      star: nextProps.review.star,
      title: nextProps.review.title,
      content: nextProps.review.content
    });
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { uid, itemId, handleEditReview, history, review } = this.props;
    const payload = {
      _id: review._id,
      star: this.state.star,
      title: this.state.title,
      content: this.state.content,
      created: Date.now(),
      author: uid
    };
    handleEditReview(itemId, payload, () => history.push(`/detail/${itemId}`));
  };

  render() {
    const { item, isFetching, error, reviewError } = this.props;

    const stars = [];
    for (let i = 1; i <= 5; i++) {
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

    if (isFetching) {
      return <p style={{ textAlign: "center" }}>LOADING</p>;
    }

    return (
      <div>
        {item.map(item => <ItemContainer key={item._id} itemId={item._id} />)}
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
              TITLE <span style={{ color: "red" }}>*</span>{" "}
              <span>{reviewError["reviews.0.title"]}</span>
            </label>
            <input
              type="text"
              style={{ width: "100%", padding: 0 }}
              value={this.state.title}
              onChange={e => {
                this.setState({ title: e.target.value });
              }}
              required
              maxLength="100"
              autoFocus
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <label>
              REVIEW <span style={{ color: "red" }}>*</span>
              <span style={{ color: "red", marginLeft: "3px" }}>
                {reviewError["reviews.0.content"]}
              </span>
            </label>
            <textarea
              style={{ width: "100%", marginBottom: 10, padding: 0 }}
              rows="4"
              required
              value={this.state.content}
              onChange={e => {
                this.setState({ content: e.target.value });
              }}
              maxLength="1000"
            />
          </div>
          <div>
            <button style={styles.submit}>Update Review</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ items, users, itemDetail }, ownProps) => {
  const itemId = ownProps.match.params.itemId;
  const uid = users.ownInfo._id;
  return {
    uid,
    itemId,
    isFetching: itemDetail.isFetching,
    error: itemDetail.error,
    reviewError: itemDetail.reviewError,
    item: items[itemId] ? [items[itemId]] : [],
    review: items[itemId]
      ? items[itemId].reviews.find(review => review.author._id === uid)
      : {}
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleFetchItemDetail,
      handleEditReview
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

EditReview = connect(mapStateToProps, mapDispatchToProps)(EditReview);

export default EditReview;
