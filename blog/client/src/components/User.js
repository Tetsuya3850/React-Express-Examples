import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleGetArticlesByUser } from "../reducers/articlesReducer";

class User extends Component {
  componentDidMount() {
    const { match, handleGetArticlesByUser } = this.props;

    handleGetArticlesByUser(match.params.userId);
  }
  render() {
    const { user } = this.props;
    return (
      <div>
        <h3>{user.name}</h3>
      </div>
    );
  }
}

const mapStateToProps = ({ articles, users }, { match }) => {
  const user = users[match.params.userId] ? users[match.params.userId] : {};
  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleGetArticlesByUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
