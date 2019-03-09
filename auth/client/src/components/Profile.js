import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleGetUser } from "../reducers";

class Profile extends Component {
  componentDidMount() {
    this.props.handleGetUser();
  }
  render() {
    const { uid, userInfo } = this.props;
    return (
      <div>
        <p>Your uid is {uid}</p>
        <p>Your user name is {userInfo.name}</p>
        <p>Your email address is {userInfo.email}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleGetUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
