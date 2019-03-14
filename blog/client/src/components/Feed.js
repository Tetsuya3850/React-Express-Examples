import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleFetchFeed } from "../reducers/feedReducer";

class Feed extends Component {
  componentDidMount() {
    this.props.handleFetchFeed();
  }
  render() {
    return (
      <div>
        <p>Feed!</p>
        <Link to="new-article">New Article</Link>
        {this.props.feedByIds.map(articleId => (
          <div key={articleId}>{articleId}</div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ feed }) => feed;

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleFetchFeed }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
