import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modal from "react-modal";
import { handleAddSweet } from "../reducer/sweets";

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
      likedUserIds: [],
      author: this.props.uid,
      comments: []
    };
    this.props.handleAddSweet(sweet, () => {
      this.text.value = "";
      this.closeModal();
    });
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
          <div style={innerStyles.container}>
            <p>New Sweet</p>
            <p onClick={this.closeModal} style={innerStyles.close}>
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
              style={innerStyles.text}
            />
            <input type="submit" value="Sweet!" style={innerStyles.submit} />
          </form>
          <p style={innerStyles.error}>{this.props.error}</p>
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

const innerStyles = {
  container: {
    display: "flex",
    justifyContent: "space-between"
  },
  close: {
    cursor: "pointer"
  },
  text: {
    width: "100%",
    margin: "10px 0px",
    fontSize: "14px"
  },
  submit: {
    display: "block",
    margin: "auto"
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 10,
    marginBottom: 0
  }
};

const mapStateToProps = ({ users, sweets }) => {
  return {
    uid: users.ownInfo._id,
    error: sweets.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleAddSweet
    },
    dispatch
  );
};

SweetModal = connect(mapStateToProps, mapDispatchToProps)(SweetModal);

export default SweetModal;
