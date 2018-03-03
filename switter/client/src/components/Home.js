import React, { Component } from "react";
import { connect } from "react-redux";
import Feed from "./Feed";
import Hello from "./Hello";

class Home extends Component {
  render() {
    const { user } = this.props;
    return <div>{user.isAuthed ? <Feed /> : <Hello />}</div>;
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

Home = connect(mapStateToProps, null)(Home);

export default Home;
