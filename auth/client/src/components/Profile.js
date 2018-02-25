import React, { Component } from "react";
import { connect } from "react-redux";
import api from "../api";

// TODO: Make the secret message work!

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  handleSecret = async () => {
    const secret = await api.getSecret();
    this.setState({ message: secret.message });
  };

  render() {
    const { userInfo } = this.props;
    return (
      <div>
        <p>You're user name is {userInfo.name}</p>
        <p>You're email is {userInfo.email}</p>
        <div onClick={this.handleSecret}>
          Click here for a secret message for logged in users!
        </div>
        <p style={{ textAlign: "center", color: "red" }}>
          {this.state.message}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

Profile = connect(mapStateToProps, null)(Profile);

export default Profile;
