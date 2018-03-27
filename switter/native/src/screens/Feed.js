import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { handleFetchFeedSweets } from "../reducer/feed";
import { logoutUser } from "../reducer/users";
import SweetContainer from "../components/SweetContainer";

class Feed extends Component {
  static navigationOptions = {
    title: "Switter"
  };
  componentDidMount() {
    this.props.handleFetchFeedSweets();
  }
  render() {
    const { isFetching, error, sweetIds } = this.props;
    return (
      <ScrollView>
        {isFetching ? (
          <Text style={{ textAlign: "center" }}>LOADING</Text>
        ) : (
          <View>
            {sweetIds.map(sweetId => (
              <SweetContainer key={sweetId} sweetId={sweetId} />
            ))}
            <Text
              style={{ textAlign: "center", color: "red", marginTop: 10 }}
              onPress={() => this.props.logoutUser(() => {})}
            >
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
      handleFetchFeedSweets,
      logoutUser
    },
    dispatch
  );
};

Feed = connect(mapStateToProps, mapDispatchToProps)(Feed);

export default Feed;
