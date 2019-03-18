import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleFetchUserFeed } from "../reducers/userFeedReducer";
import ArticlePreview from "./ArticlePreview";

class User extends Component {
  componentDidMount() {
    const { match, handleFetchUserFeed } = this.props;
    handleFetchUserFeed(match.params.userId);
  }

  render() {
    const { isFetching, error, userInfo, userArticleIds } = this.props;

    if (isFetching) {
      return <div>LOADING...</div>;
    }

    if (!isFetching && error) {
      return <div style={styles.error}>{error}</div>;
    }

    return (
      <div>
        <div>{userInfo.name}</div>
        <div>
          {userArticleIds.map(articleId => (
            <ArticlePreview key={articleId} articleId={articleId} />
          ))}
        </div>
      </div>
    );
  }
}

const styles = {
  error: {
    color: "red"
  }
};

const mapStateToProps = ({ users, userFeed }, { match }) => {
  const userInfo = users[match.params.userId] ? users[match.params.userId] : {};
  const userArticleIds = userFeed.userFeedByIds[match.params.userId]
    ? userFeed.userFeedByIds[match.params.userId]
    : [];
  const { isFetching, error } = userFeed;
  return {
    isFetching,
    error,
    userInfo,
    userArticleIds
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleFetchUserFeed }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
