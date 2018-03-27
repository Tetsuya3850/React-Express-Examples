import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { handleFetchFeedSweets } from "../reducer/feed";
import SweetContainer from "./SweetContainer";

class Feed extends Component {
  componentDidMount() {
    this.props.handleFetchFeedSweets();
  }
  render() {
    const { isFetching, error, sweetIds } = this.props;
    return (
      <div>
        {isFetching ? (
          <p style={{ textAlign: "center" }}>LOADING</p>
        ) : (
          <div>
            {sweetIds.map(sweetId => (
              <SweetContainer key={sweetId} sweetId={sweetId} />
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

const mapStateToProps = ({ feed }) => {
  return feed;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleFetchFeedSweets
    },
    dispatch
  );
};

Feed = connect(mapStateToProps, mapDispatchToProps)(Feed);

export default Feed;
