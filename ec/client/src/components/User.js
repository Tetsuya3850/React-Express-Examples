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
    const { error, isFetching, orders } = this.props;
    return (
      <div>
        <p style={{ textAlign: "center" }}>Order History</p>
        <hr />
        <p style={{ textAlign: "center", color: "red", marginTop: 10 }}>
          {error}
        </p>
        {isFetching ? (
          <p style={{ textAlign: "center" }}>LOADING</p>
        ) : (
          <div>{orders.map(order => <Order key={order._id} {...order} />)}</div>
        )}
      </div>
    );
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
