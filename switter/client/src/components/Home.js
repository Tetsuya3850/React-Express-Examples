import React, { Component } from "react";
import { connect } from "react-redux";
import Hello from "./Hello";
import FeedContainer from "./FeedContainer";
import { receiveFeedThunk } from "../redux/sweet";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(receiveFeedThunk());
  }

  render() {
    const { user, sweet } = this.props;
    return (
      <div>
        {user.isAuthed ? <FeedContainer feed={sweet.feed} /> : <Hello />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

Home = connect(mapStateToProps, null)(Home);

export default Home;
