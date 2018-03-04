import React, { Component } from "react";
import { connect } from "react-redux";
import SweetContainer from "./SweetContainer";
import { handleReceiveSweet } from "../redux/sweets";

class SweetComments extends Component {
  componentDidMount() {
    this.props.dispatch(handleReceiveSweet(this.props.match.params.sweetId));
  }

  render() {
    return (
      <div>
        {this.props.isFetching ? (
          <p style={{ textAlign: "center" }}>LOADING</p>
        ) : (
          this.props.sweet.map(sweet => <SweetContainer sweetId={sweet._id} />)
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ sweets }, ownProps) => {
  return {
    isFetching: sweets.isFetching,
    sweet: sweets[ownProps.match.params.sweetId]
      ? [sweets[ownProps.match.params.sweetId]]
      : []
  };
};

SweetComments = connect(mapStateToProps, null)(SweetComments);

export default SweetComments;
