import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ItemContainer from "./ItemContainer";
import EditNum from "./EditNum";
import { handleDeleteItem } from "../reducer/users";

class Cart extends Component {
  render() {
    const { cart, handleDeleteItem } = this.props;
    return (
      <div>
        {Object.keys(cart).map(itemId => (
          <div key={itemId}>
            <ItemContainer itemId={itemId} />
            <div style={{ display: "flex" }}>
              <EditNum itemId={itemId} />
              <button onClick={() => handleDeleteItem(itemId)}>DELETE</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    cart: users.cart
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleDeleteItem
    },
    dispatch
  );
};

Cart = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default Cart;
