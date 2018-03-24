import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { postSweet } from "../api";

class SweetModal extends Component {
  state = {
    modalIsOpen: false
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const sweet = {
      text: this.text.value,
      created: Date.now(),
      likedByIds: [],
      author: this.props.users.ownInfo._id,
      comments: []
    };
    postSweet(sweet);
    this.text.value = "";
    this.closeModal();
  };

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Sweet</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={styles}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <p>New Sweet</p>
            <p onClick={this.closeModal} style={{ cursor: "pointer" }}>
              X
            </p>
          </div>
          <form onSubmit={this.handleFormSubmit}>
            <textarea
              rows="6"
              ref={node => {
                this.text = node;
              }}
              autoFocus
              required
              placeholder="What's Up Dood?"
              maxLength="140"
              style={{ width: "100%", margin: "10px 0px", fontSize: "14px" }}
            />
            <input
              type="submit"
              value="Sweet!"
              style={{ display: "block", margin: "auto" }}
            />
          </form>
        </Modal>
      </div>
    );
  }
}

Modal.setAppElement("#root");

const styles = {
  content: {
    top: "10%",
    left: "50%",
    right: "80%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%)"
  }
};

const mapStateToProps = ({ users }) => {
  return { users };
};

SweetModal = connect(mapStateToProps, null)(SweetModal);

export default SweetModal;
