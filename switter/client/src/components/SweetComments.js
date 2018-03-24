import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SweetContainer from "./SweetContainer";
import Comments from "./Comments";
import { handleFetchSweet, handleAddComment } from "../reducer/sweets";

class SweetComments extends Component {
  componentDidMount() {
    const { match, handleFetchSweet } = this.props;
    const { sweetId } = match.params;
    handleFetchSweet(sweetId);
  }

  handleFormSubmit = e => {
    const { match, handleAddComment, uid } = this.props;
    const { sweetId } = match.params;
    e.preventDefault();
    const comment = {
      text: this.text.value,
      created: Date.now(),
      author: uid
    };
    handleAddComment(sweetId, comment);
    this.text.value = "";
  };

  render() {
    const { isFetching, sweet } = this.props;
    return (
      <div>
        {isFetching ? (
          <p style={{ textAlign: "center" }}>LOADING</p>
        ) : (
          <div>
            {sweet.map(sweet => (
              <div key={`div${sweet._id}`}>
                <SweetContainer sweetId={sweet._id} />
                <hr />
                <Comments comments={sweet.comments} />
              </div>
            ))}
            <form onSubmit={this.handleFormSubmit}>
              <textarea
                rows="4"
                ref={node => {
                  this.text = node;
                }}
                required
                autoFocus
                placeholder="Leave a Comment!"
                maxLength="140"
                style={{
                  width: "80%",
                  display: "block",
                  margin: "10px auto",
                  fontSize: "14px"
                }}
              />

              <input
                type="submit"
                value="Comment!"
                style={{ display: "block", margin: "auto" }}
              />
            </form>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ users, sweets }, ownProps) => {
  return {
    uid: users.ownInfo._id,
    isFetching: sweets.isFetching,
    sweet: sweets[ownProps.match.params.sweetId]
      ? [sweets[ownProps.match.params.sweetId]]
      : []
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleFetchSweet,
      handleAddComment
    },
    dispatch
  );
};

SweetComments = connect(mapStateToProps, mapDispatchToProps)(SweetComments);

export default SweetComments;
