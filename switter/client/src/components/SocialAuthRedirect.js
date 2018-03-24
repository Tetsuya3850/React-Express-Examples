import React, { Component } from "react";
import { connect } from "react-redux";
import { socialAuthUser } from "../reducer/users";
import { getCookie } from "../helper";

class SocialAuthRedirect extends Component {
  componentWillMount() {
    const searchParams = new URLSearchParams(window.location.search);
    this.props.dispatch(
      socialAuthUser(searchParams.get("token"), () => {
        this.props.history.push("/");
      })
    );
  }

  render() {
    return <div />;
  }
}

SocialAuthRedirect = connect()(SocialAuthRedirect);

export default SocialAuthRedirect;
