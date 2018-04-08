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
    const { uid, itemId, handleAddReview } = this.props;
    const payload = {
      star: this.state.star,
      title: this.title.value,
      content: this.content.value,
      created: Date.now(),
      author: uid
    };
    handleAddReview(itemId, payload);
  };

  render() {
    const { item, match } = this.props;

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
        {item.map(item => <ItemContainer key={item._id} itemId={item._id} />)}
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <span>STARS</span>
            <div style={{ margin: "10px" }}>{stars}</div>
          </div>

          <label>
            TITLE <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            style={{ width: "100%" }}
            ref={node => {
              this.title = node;
            }}
            required
            maxLength="100"
            autoFocus
          />
          <label style={{ marginTop: 10 }}>
            REVIEW <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            style={{ width: "100%", marginBottom: 10 }}
            rows="4"
            ref={node => {
              this.content = node;
            }}
            maxLength="1000"
          />

          <button style={styles.submit}>Submit Review</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ items, users }, ownProps) => {
  const itemId = ownProps.match.params.itemId;
  return {
    uid: users.ownInfo._id,
    itemId,
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
