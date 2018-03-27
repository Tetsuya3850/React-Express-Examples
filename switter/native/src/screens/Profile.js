import React, { Component } from "react";
import { View, Text } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { handleFetchUser } from "../reducer/users";
import { handleFetchUserSweets } from "../reducer/userSweets";
import SweetContainer from "../components/SweetContainer";

class Profile extends Component {
  componentDidMount() {
    const { uid, handleFetchUser, handleFetchUserSweets } = this.props;
    handleFetchUser(uid);
    handleFetchUserSweets(uid);
  }
  render() {
    const { isFetching, name, userSweetIds, error } = this.props;
    return (
      <View>
        {isFetching ? (
          <Text style={{ textAlign: "center" }}>LOADING</Text>
        ) : (
          <View>
            <Text style={{ textAlign: "center" }}>{name}</Text>
            {userSweetIds.map(sweetId => (
              <SweetContainer key={sweetId} sweetId={sweetId} />
            ))}
            <Text style={{ textAlign: "center", color: "red", marginTop: 10 }}>
              {error}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ userSweets, users }, ownProps) => {
  return {
    uid: ownProps.match.params.uid,
    isFetching: userSweets.isFetching,
    name: users[ownProps.match.params.uid]
      ? users[ownProps.match.params.uid].name
      : "",
    userSweetIds: userSweets[ownProps.match.params.uid]
      ? userSweets[ownProps.match.params.uid]
      : [],
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
