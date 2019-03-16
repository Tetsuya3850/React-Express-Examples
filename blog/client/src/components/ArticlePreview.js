import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ArticlePreview = ({ article, authorInfo }) => (
  <div>
    <hr />
    <Link to={`articles/${article._id}`}>
      <h3>Title: {article.title}</h3>
    </Link>
    <Link to={`users/${article.author}`}>Author: {authorInfo.name}</Link>
    <p>Text: {article.text}</p>
  </div>
);

const mapStateToProps = ({ articles, users }, { articleId }) => {
  const article = articles[articleId];
  const authorInfo = users[article.author];
  return {
    article,
    authorInfo
  };
};

export default connect(
  mapStateToProps,
  null
)(ArticlePreview);
