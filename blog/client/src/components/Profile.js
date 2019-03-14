import React, { Component } from "react";
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    const { uid } = this.props;
    return (
      <div>
        <p>Your uid is {uid}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
