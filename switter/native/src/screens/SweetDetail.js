import React, { Component } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SweetContainer from "../components/SweetContainer";
import Comments from "../components/Comments";
import { handleFetchSweetDetail } from "../reducer/sweetDetail";
import { handleAddComment } from "../reducer/sweets";

class SweetDetail extends Component {
  componentDidMount() {
    const { sweetId, handleFetchSweetDetail } = this.props;
    handleFetchSweetDetail(sweetId);
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { sweetId, handleAddComment, uid } = this.props;
    const comment = {
      text: this.text.value,
      created: Date.now(),
      author: uid
    };
    handleAddComment(sweetId, comment, () => {
      this.text.value = "";
    });
  };

  render() {
    const { isFetching, sweet, error } = this.props;
    return (
      <View>
        {isFetching ? (
          <Text style={{ textAlign: "center" }}>LOADING</Text>
        ) : (
          <ScrollView>
            {sweet.map(sweet => (
              <View key={`${sweet._id}`}>
                <SweetContainer sweetId={sweet._id} />
                <Comments comments={sweet.comments} />
              </View>
            ))}
            <TextInput
              rows="4"
              ref={node => {
                this.text = node;
              }}
              required
              autoFocus
              placeholder="Leave a Comment!"
              maxLength={140}
              style={{
                width: "80%",
                fontSize: 14
              }}
            />
            <Button
              onPress={this.handleFormSubmit}
              title="Comment!"
              style={{ display: "block", margin: "auto" }}
            />
            <Text style={{ textAlign: "center", color: "red", marginTop: 10 }}>
              {error}
            </Text>
          </ScrollView>
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

SweetDetail = connect(mapStateToProps, mapDispatchToProps)(SweetDetail);

export default SweetDetail;
