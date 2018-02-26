import React, { Component } from "react";
import { connect } from "react-redux";
import { fbAuthUser } from "../actions";

class Facebook extends Component {
  componentWillMount() {
    this.props.dispatch(
      fbAuthUser(this.props.match.params.token, () =>
        this.props.history.push("/profile")
      )
    );
  }

  render() {
    return <div />;
  }
}

Facebook = connect()(Facebook);

export default Facebook;
