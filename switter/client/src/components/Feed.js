import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { handleFeedSweets } from "../redux/feed";
import SweetContainer from "./SweetContainer";

class Feed extends Component {
  componentDidMount() {
    const { handleFeedSweets } = this.props;
    handleFeedSweets();
  }
  render() {
    const { feed } = this.props;
    return (
      <div>
        {feed.isFetching ? (
          <p style={{ textAlign: "center" }}>LOADING</p>
        ) : (
          <div>
            {feed.sweetIds.map(sweetId => (
              <SweetContainer key={sweetId} sweetId={sweetId} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ feed }) => {
  return { feed };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleFeedSweets
    },
    dispatch
  );
};

Feed = connect(mapStateToProps, mapDispatchToProps)(Feed);

export default Feed;
