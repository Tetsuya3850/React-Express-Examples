import React from "react";
import { connect } from "react-redux";
import api from "../api";

// TODO: Make the secret message work!
let Profile = ({ userInfo }) => (
  <div>
    <p>You're user name is {userInfo.name}</p>
    <p>You're email is {userInfo.email}</p>
    <div onClick={() => api.getSecret}>
      Click here for a secret message for logged in users!
    </div>
  </div>
);

const mapStateToProps = state => {
  return state;
};

Profile = connect(mapStateToProps, null)(Profile);

export default Profile;
