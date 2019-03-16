import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { handleGetArticle } from "../reducers/articlesReducer";

class ArticleDetail extends Component {
  componentDidMount() {
    const { match, handleGetArticle } = this.props;
    handleGetArticle(match.params.articleId);
  }

  render() {
    const { article, authorInfo } = this.props;
    return (
      <div>
        <h3>Title: {article.title}</h3>
        <Link to={`users/${article.author}`}>Author: {authorInfo.name}</Link>
        <p>Text: {article.text}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ articles, users }, { match }) => {
  const article = articles[match.params.articleId]
    ? articles[match.params.articleId]
    : {};
  const authorInfo = users[article.author] ? users[article.author] : {};
  return {
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
