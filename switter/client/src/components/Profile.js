import React, { Component } from "react";
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    const { userInfo } = this.props;
    return (
      <div>
        <p>You're user name is {userInfo.name}</p>
        <p>You're email is {userInfo.email}</p>
        <img src={userInfo.pic} />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return user;
};

Profile = connect(mapStateToProps, null)(Profile);

export default Profile;
