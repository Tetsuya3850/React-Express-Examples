import React, { Component } from "react";
import { connect } from "react-redux";
import { handleFeedSweets } from "../redux/feed";
import SweetContainer from "./SweetContainer";

class Feed extends Component {
  componentDidMount() {
    this.props.dispatch(handleFeedSweets());
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

Feed = connect(mapStateToProps, null)(Feed);

export default Feed;
