import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Button
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { handleFetchFeedSweets } from "../reducer/feed";
import { logoutUser } from "../reducer/users";
import SweetContainer from "../components/SweetContainer";
import SweetModal from "../components/SweetModal";

class Feed extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Switter",
      headerStyle: { paddingHorizontal: 5 },
      headerRight: <SweetModal />
    };
  };

  componentDidMount() {
    this.props.handleFetchFeedSweets();
  }

  render() {
    const { isFetching, error, sweetIds } = this.props;
    return (
      <ScrollView style={{ backgroundColor: "#fff" }}>
        {isFetching ? (
          <ActivityIndicator size="large" style={{ marginTop: 15 }} />
        ) : (
          <View>
            {sweetIds.map(sweetId => (
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

const mapStateToProps = ({ feed }) => {
  return feed;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleFetchFeedSweets
    },
    dispatch
  );
};

Feed = connect(mapStateToProps, mapDispatchToProps)(Feed);

export default Feed;
