import React from "react";
import { connect } from "react-redux";
import Hello from "./Hello";
import FeedContainer from "./FeedContainer";

let Home = ({ user, sweet }) => (
  <div>{user.isAuthed ? <FeedContainer feed={sweet.feed} /> : <Hello />}</div>
);

const mapStateToProps = state => {
  return state;
};

Home = connect(mapStateToProps, null)(Home);

export default Home;
