import React, { Component } from "react";
import { connect } from "react-redux";
import api from "../api";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ""
    };
  }

  handleSecret = async () => {
    const secret = await api.getSecret(this.props.match.params.uid);
    this.setState({ code: secret.code });
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
        <p style={{ textAlign: "center", color: "red" }}>{this.state.code}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

Profile = connect(mapStateToProps, null)(Profile);

export default Profile;
