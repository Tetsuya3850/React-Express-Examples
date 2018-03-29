import React, { Component } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { handleFetchUser } from "../reducer/users";
import { handleFetchUserSweets } from "../reducer/userSweets";
import Profile from "../components/Profile";
import SweetContainer from "../components/SweetContainer";
import SweetModal from "../components/SweetModal";

class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "User",
    headerStyle: { paddingRight: 5 },
    headerRight: <SweetModal />
  });

  componentDidMount() {
    const { uid, handleFetchUser, handleFetchUserSweets } = this.props;
    handleFetchUser(uid);
    handleFetchUserSweets(uid);
  }

  render() {
    const { isFetching, name, email, pic, userSweetIds, error } = this.props;
    return (
      <ScrollView style={{ backgroundColor: "#fff" }}>
        {isFetching ? (
          <ActivityIndicator size="large" style={{ marginTop: 15 }} />
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
  let uid, name, email, pic;
  if (ownProps.navigation.state.params) {
    uid = ownProps.navigation.state.params._id;
    name = users[uid] ? users[uid].name : "";
    email = users[uid] ? users[uid].email : "";
    pic = users[uid] ? users[uid].pic : "../../assets/icon.png";
  } else {
    uid = users.ownInfo._id;
    name = users.ownInfo.name;
    email = users.ownInfo.email;
    pic = users.ownInfo.pic;
  }
  return {
    uid,
    name,
    email,
    pic,
    isFetching: userSweets.isFetching,
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

User = connect(mapStateToProps, mapDispatchToProps)(User);

export default User;
