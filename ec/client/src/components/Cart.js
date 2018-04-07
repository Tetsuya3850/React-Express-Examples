import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ItemContainer from "./ItemContainer";
import EditNum from "./EditNum";

class Cart extends Component {
  render() {
    return (
      <div>
        {Object.keys(this.props.cart).map(key => (
          <div>
            <ItemContainer itemId={key} />
            <div>
              <EditNum />
              <button>DELETE</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return users;
};

Cart = connect(mapStateToProps, null)(Cart);

export default Cart;
