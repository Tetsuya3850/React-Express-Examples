import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { handleFetchUser } from "../reducer/users";
import { handleFetchUserSweets } from "../reducer/userSweets";
import SweetContainer from "../components/SweetContainer";

class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name
  });

  componentDidMount() {
    const { uid, handleFetchUser, handleFetchUserSweets } = this.props;
    handleFetchUser(uid);
    handleFetchUserSweets(uid);
  }
  render() {
    const { isFetching, name, userSweetIds, error } = this.props;
    return (
      <ScrollView>
        {isFetching ? (
          <Text style={{ textAlign: "center" }}>LOADING</Text>
        ) : (
          <View>
            {userSweetIds.map(sweetId => (
              <SweetContainer key={sweetId} sweetId={sweetId} />
            ))}
            <Text style={{ textAlign: "center", color: "red", marginTop: 10 }}>
              {error}
            </Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ userSweets, users }, ownProps) => {
  const uid = ownProps.navigation.state.params._id;
  return {
    uid,
    isFetching: userSweets.isFetching,
    name: ownProps.navigation.state.params.name,
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
