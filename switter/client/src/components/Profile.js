import React, { Component } from "react";
import { connect } from "react-redux";
import { receiveUserInfo } from "../redux/users";
import { receiveUserSweets } from "../redux/userSweets";
import SweetContainer from "./SweetContainer";

class Profile extends Component {
  componentDidMount() {
    const { match, dispatch } = this.props;
    dispatch(receiveUserInfo(match.params.uid));
    dispatch(receiveUserSweets(match.params.uid));
  }
  render() {
    const { match, userSweets, users } = this.props;
    if (users[match.params.uid] === undefined) {
      users[match.params.uid] = {};
    }
    if (userSweets[match.params.uid] === undefined) {
      userSweets[match.params.uid] = [];
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

Profile = connect(mapStateToProps, null)(Profile);

export default Profile;
