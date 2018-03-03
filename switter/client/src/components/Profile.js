import React, { Component } from "react";
import { connect } from "react-redux";
import { receiveOwnSweetsThunk } from "../redux/user";
import SweetContainer from "./SweetContainer";

class Profile extends Component {
  componentDidMount() {
    const { userInfo, dispatch } = this.props;
    dispatch(receiveOwnSweetsThunk(userInfo._id));
  }
  render() {
    const { userInfo, sweets } = this.props;
    return (
      <div>
        <p>You're user name is {userInfo.name}</p>
        <p>You're email is {userInfo.email}</p>
        <img src={userInfo.pic} alt="profile" />
        <SweetContainer sweets={sweets} />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return user;
};

Profile = connect(mapStateToProps, null)(Profile);

export default Profile;
