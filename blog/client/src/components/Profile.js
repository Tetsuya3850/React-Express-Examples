import React, { Component } from "react";
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    return (
      <div>
        <p>Profile</p>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return auth;
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
