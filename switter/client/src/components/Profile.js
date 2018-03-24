import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { receiveUserInfo } from "../reducer/users";
import { receiveUserSweets } from "../reducer/userSweets";
import SweetContainer from "./SweetContainer";

class Profile extends Component {
  componentDidMount() {
    const { match, receiveUserInfo, receiveUserSweets } = this.props;
    const { uid } = match.params;
    receiveUserInfo(uid);
    receiveUserSweets(uid);
  }
  render() {
    const { match, userSweets, users } = this.props;
    const { uid } = match.params;
    if (users[uid] === undefined) {
      users[uid] = {};
    }
    if (userSweets[uid] === undefined) {
      userSweets[uid] = [];
    }
    return (
      <div>
        {userSweets.isFetching ? (
          <p style={{ textAlign: "center" }}>LOADING</p>
        ) : (
          <div>
            <p style={{ textAlign: "center" }}>
              {users[match.params.uid].name}&#39;s Sweets
            </p>
            {userSweets[match.params.uid].map(sweetId => (
              <SweetContainer key={sweetId} sweetId={sweetId} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ userSweets, users }) => {
  return { userSweets, users };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      receiveUserInfo,
      receiveUserSweets
    },
    dispatch
  );
};

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile;
