import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { handleFetchUser } from "../reducer/users";
import { handleFetchUserSweets } from "../reducer/userSweets";
import SweetContainer from "./SweetContainer";

class Profile extends Component {
  componentDidMount() {
    const { uid, handleFetchUser, handleFetchUserSweets } = this.props;
    handleFetchUser(uid);
    handleFetchUserSweets(uid);
  }
  render() {
    const { isFetching, name, userSweetIds, error } = this.props;
    return (
      <div>
        {isFetching ? (
          <p style={{ textAlign: "center" }}>LOADING</p>
        ) : (
          <div>
            <p style={{ textAlign: "center" }}>{name}</p>
            {userSweetIds.map(sweetId => (
              <SweetContainer key={sweetId} sweetId={sweetId} />
            ))}
            <p style={{ textAlign: "center", color: "red", marginTop: 10 }}>
              {error}
            </p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ userSweets, users }, ownProps) => {
  const uid = ownProps.match.params.uid;
  return {
    uid,
    isFetching: userSweets.isFetching,
    name: users[uid] ? users[uid].name : "",
    userSweetIds: userSweets[uid] ? userSweets[uid] : [],
    error: userSweets.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleFetchUser,
      handleFetchUserSweets
    },
    dispatch
  );
};

Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default Profile;
