import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { handleGetHistory } from "../reducer/users";
import Order from "./Order";

class User extends Component {
  componentDidMount() {
    this.props.handleGetHistory();
  }

  render() {
    return this.props.orders.map(order => <Order key={order._id} {...order} />);
  }
}

const mapStateToProps = ({ users }) => {
  return users;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleGetHistory
    },
    dispatch
  );
};

User = connect(mapStateToProps, mapDispatchToProps)(User);

export default User;
