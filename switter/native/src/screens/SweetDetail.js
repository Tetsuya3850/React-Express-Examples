import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SweetContainer from "../components/SweetContainer";
import Comments from "../components/Comments";
import { handleFetchSweetDetail } from "../reducer/sweetDetail";
import { handleAddComment } from "../reducer/sweets";

class SweetDetail extends Component {
  state = {
    text: ""
  };

  componentDidMount() {
    const { sweetId, handleFetchSweetDetail } = this.props;
    handleFetchSweetDetail(sweetId);
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { sweetId, handleAddComment, uid } = this.props;
    const { text } = this.state;
    const comment = {
      text,
      created: Date.now(),
      author: uid
    };
    handleAddComment(sweetId, comment, () => {
      this.setState({ text: "" });
    });
  };

  render() {
    const { isFetching, sweet, error } = this.props;
    const { text } = this.state;

    return (
      <View style={styles.container}>
        {isFetching ? (
          <View />
        ) : (
          <KeyboardAwareScrollView>
            {sweet.map(sweet => (
              <View key={`${sweet._id}`}>
                <SweetContainer sweetId={sweet._id} />
                <Comments comments={sweet.comments} />
              </View>
            ))}
            <View style={styles.row}>
              <TextInput
                style={styles.textinput}
                value={text}
                placeholder={"Leave a Comment!"}
                onChangeText={text => this.setState({ text })}
                maxLength={30}
                onSubmitEditing={this.handleFormSubmit}
              />
            </View>

            <Text style={styles.error}>{error}</Text>
          </KeyboardAwareScrollView>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ users, sweets, sweetDetail }, ownProps) => {
  const sweetId = ownProps.navigation.state.params._id;
  return {
    uid: users.ownInfo._id,
    sweetId,
    isFetching: sweetDetail.isFetching,
    error: sweetDetail.error,
    sweet: sweets[sweetId] ? [sweets[sweetId]] : []
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleFetchSweetDetail,
      handleAddComment
    },
    dispatch
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loading: {
    textAlign: "center"
  },
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc"
  },
  textinput: {
    height: 45,
    paddingHorizontal: 15
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 10
  }
});

SweetDetail = connect(mapStateToProps, mapDispatchToProps)(SweetDetail);

export default SweetDetail;
