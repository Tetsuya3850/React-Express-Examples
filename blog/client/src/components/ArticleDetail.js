import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { handleGetArticle } from "../reducers/detailReducer";
import { isAuthed } from "../tokenUtils";
import * as api from "../api";

class ArticleDetail extends Component {
  componentDidMount() {
    const { match, handleGetArticle } = this.props;
    handleGetArticle(match.params.articleId);
  }

  render() {
    const { detail, article, authorInfo, history } = this.props;
    const { isFetching, error } = detail;
    const isOwner = isAuthed() === article.author;

    if (isFetching) {
      return <div>LOADING...</div>;
    }

    if (!isFetching && error) {
      return <div style={styles.error}>{error}</div>;
    }

    return (
      <div>
        <div style={styles.title}>
          <div>{article.title}</div>
          {isOwner && (
            <div>
              <Link to={`/articles/edit/${article._id}`}>Edit</Link>
              <span
                onClick={() => {
                  api.deleteArticle(article._id);
                  history.push(`/`);
                }}
                style={styles.deleteBtn}
              >
                Delete
              </span>
            </div>
          )}
        </div>

        <div>
          <span>by </span>
          <Link to={`/users/${article.author}`}>{authorInfo.name}</Link>
        </div>

        <p>{article.text}</p>
      </div>
    );
  }
}

const styles = {
  error: {
    color: "red"
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "4px",
    paddingBottom: "4px"
  },
  deleteBtn: {
    cursor: "pointer"
  }
};

const mapStateToProps = ({ articles, users, detail }, { match }) => {
  const article = articles[match.params.articleId]
    ? articles[match.params.articleId]
    : {};
  const authorInfo = users[article.author] ? users[article.author] : {};
  return {
    detail,
    article,
    authorInfo
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleGetArticle }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetail);
