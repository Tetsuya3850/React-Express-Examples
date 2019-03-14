import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Hello from "./Hello";
import Feed from "./Feed";
import { isAuthed } from "../tokenUtils";

const Home = ({ history }) => (isAuthed() ? <Feed /> : <Hello />);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  null
)(Home);
