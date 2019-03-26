import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getToken } from "../helper";
import { socialAuthUser } from "../reducer/users";

class SocialAuthRedirect extends Component {
  componentWillMount() {
    const searchParams = new URLSearchParams(window.location.search);
    this.props.dispatch(
      socialAuthUser(searchParams.get("token"), () => {
        axios.defaults.headers.common["authorization"] = `Bearer ${getToken()}`;
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
