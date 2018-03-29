import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  Dimensions,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleAddSweet, addSweetError } from "../reducer/sweets";
import Modal from "react-native-modal";
import { FontAwesome } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class SweetModal extends Component {
  state = {
    text: "",
    isVisible: false
  };

  _toggleModal = () => this.setState({ isVisible: !this.state.isVisible });

  handleFormSubmit = e => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.addSweetError("Empty!");
      return;
    }
    const sweet = {
      text: this.state.text,
      created: Date.now(),
      likedUserIds: [],
      author: this.props.uid,
      comments: []
    };
    this.props.handleAddSweet(sweet, () => {
      this.setState({ text: "" });
      this._toggleModal();
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._toggleModal}>
          <FontAwesome name="edit" size={25} />
        </TouchableOpacity>
        <Modal
          isVisible={this.state.isVisible}
          style={styles.modal}
          onBackdropPress={this._toggleModal}
          avoidKeyboard={true}
          backdropOpacity={0.5}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>New Sweet</Text>
              <TouchableOpacity
                onPress={this._toggleModal}
                style={styles.closeBtn}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              >
                <Text style={styles.close}>X</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.textinput}
              value={this.state.text}
              placeholder={"What's up dood!"}
              onChangeText={text => this.setState({ text })}
              maxLength={140}
              multiline={true}
            />
            <Text style={styles.error}>{this.props.error}</Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={this.handleFormSubmit}
              >
                <Text style={styles.submitTxt}>Go</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.3,
    backgroundColor: "white",
    justifyContent: "space-between",
    borderRadius: 15
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15
  },
  title: {
    flex: 3,
    fontSize: 20
  },
  closeBtn: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end"
  },
  close: {
    fontSize: 20
  },
  textinput: {
    height: 45,
    paddingHorizontal: 15
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 10
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10
  },
  submitBtn: {
    width: SCREEN_WIDTH * 0.2,
    backgroundColor: "#68a0cf",
    borderRadius: 10
  },
  submitTxt: {
    color: "white",
    textAlign: "center",
    fontSize: 20
  }
});

const mapStateToProps = ({ users, sweets }) => {
  return {
    uid: users.ownInfo._id,
    error: sweets.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleAddSweet,
      addSweetError
    },
    dispatch
  );
};

SweetModal = connect(mapStateToProps, mapDispatchToProps)(SweetModal);

export default SweetModal;
