import React from "react";
import { connect } from "react-redux";

let Profile = ({ userInfo }) => (
  <div>
    <p>You're user name is {userInfo.name}</p>
    <p>You're email is {userInfo.email}</p>
  </div>
);

const mapStateToProps = state => {
  return state;
};

Profile = connect(mapStateToProps, null)(Profile);

export default Profile;
