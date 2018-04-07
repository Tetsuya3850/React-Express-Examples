import React, { Component } from "react";
import { connect } from "react-redux";
import Feed from "./Feed";
import Hello from "./Hello";

class Home extends Component {
  render() {
    return <div>{this.props.isAuthed ? <Feed /> : <Hello />}</div>;
  }
}

const mapStateToProps = ({ users }) => {
  return users;
};

Home = connect(mapStateToProps, null)(Home);

export default Home;
