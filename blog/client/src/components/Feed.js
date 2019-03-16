import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleFetchFeed } from "../reducers/feedReducer";
import ArticlePreview from "./ArticlePreview";

class Feed extends Component {
  componentDidMount() {
    this.props.handleFetchFeed();
  }

  render() {
    const { isFetching, error, feedByIds } = this.props;

    return (
      <div>
        <p>Feed!</p>
        <Link to="new-article">New Article</Link>
        {isFetching ? (
          <p>LOADING</p>
        ) : (
          <div>
            {feedByIds.map(articleId => (
              <ArticlePreview key={articleId} articleId={articleId} />
            ))}
          </div>
        )}
        <p style={styles.error}>{error}</p>
      </div>
    );
  }
}

const styles = {
  error: {
    color: "red"
  }
};

const mapStateToProps = ({ feed }) => feed;

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleFetchFeed }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
