import React, { Component } from "react";
import { connect } from "react-redux";
import api from "../api";

class Profile extends Component {
  state = {
    code: ""
  };

  handleSecret = async () => {
    try {
      let { data } = await api.getSecret(this.props.match.params.uid);
      this.setState({ code: data.code });
    } catch (e) {
      if (!e.response) {
        console.log(e);
        return;
      }
      let { data } = e.response;
      this.setState({ code: data.code });
    }
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
