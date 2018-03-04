import React, { Component } from "react";
import { connect } from "react-redux";
import SweetContainer from "./SweetContainer";
import Comments from "./Comments";
import { handleReceiveSweet, handleAddComment } from "../redux/sweets";

class SweetComments extends Component {
  componentDidMount() {
    this.props.dispatch(handleReceiveSweet(this.props.match.params.sweetId));
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const comment = {
      text: this.text.value,
      created: Date.now(),
      author: this.props.uid
    };
    this.props.dispatch(
      handleAddComment(this.props.match.params.sweetId, comment)
    );
    this.text.value = "";
  };

  render() {
    return (
      <div>
        {this.props.isFetching ? (
          <p style={{ textAlign: "center" }}>LOADING</p>
        ) : (
          <div>
            {this.props.sweet.map(sweet => (
              <div key={`div${sweet._id}`}>
                <SweetContainer sweetId={sweet._id} />
                <hr />
                <Comments comments={sweet.comments} />
              </div>
            ))}
            <form
              onSubmit={this.handleFormSubmit}
              style={{
                marginTop: "10px"
              }}
            >
              <textarea
                rows="4"
                ref={node => {
                  this.text = node;
                }}
                required
                placeholder="Leave a Comment!"
                maxLength="1000"
                style={{
                  width: "80%",
                  display: "block",
                  margin: "auto",
                  marginBottom: "10px"
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

SweetComments = connect(mapStateToProps, null)(SweetComments);

export default SweetComments;
