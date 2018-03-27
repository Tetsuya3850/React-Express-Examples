import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SweetContainer from "./SweetContainer";
import Comments from "./Comments";
import { handleFetchSweetDetail } from "../reducer/sweetDetail";
import { handleAddComment } from "../reducer/sweets";

class SweetDetail extends Component {
  componentDidMount() {
    const { sweetId, handleFetchSweetDetail } = this.props;
    handleFetchSweetDetail(sweetId);
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { sweetId, handleAddComment, uid } = this.props;
    const comment = {
      text: this.text.value,
      created: Date.now(),
      author: uid
    };
    handleAddComment(sweetId, comment, () => {
      this.text.value = "";
    });
  };

  render() {
    const { isFetching, sweet, error } = this.props;
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
            <p style={{ textAlign: "center", color: "red", marginTop: 10 }}>
              {error}
            </p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ users, sweets, sweetDetail }, ownProps) => {
  return {
    uid: users.ownInfo._id,
    sweetId: ownProps.match.params.sweetId,
    isFetching: sweetDetail.isFetching,
    error: sweetDetail.error,
    sweet: sweets[ownProps.match.params.sweetId]
      ? [sweets[ownProps.match.params.sweetId]]
      : []
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleFetchSweetDetail,
      handleAddComment
    },
    dispatch
  );
};

SweetDetail = connect(mapStateToProps, mapDispatchToProps)(SweetDetail);

export default SweetDetail;
