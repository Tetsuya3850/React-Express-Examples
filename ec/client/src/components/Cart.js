import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ItemContainer from "./ItemContainer";
import EditNum from "./EditNum";
import { handleDeleteItem, handleOrder } from "../reducer/users";

class Cart extends Component {
  render() {
    const {
      ownInfo,
      isFetching,
      error,
      cart,
      cartError,
      handleDeleteItem,
      handleOrder,
      history
    } = this.props;

    if (isFetching) {
      return <p style={{ textAlign: "center" }}>LOADING</p>;
    }

    return (
      <div>
        {Object.keys(cart).length !== 0 ? (
          <div>
            <p style={{ textAlign: "center", color: "red", marginTop: 10 }}>
              {error}
            </p>
            <p style={{ textAlign: "center", color: "red", marginTop: 10 }}>
              {cartError}
            </p>
            {Object.keys(cart).map(itemId => (
              <div key={itemId}>
                <ItemContainer itemId={itemId} />
                <div
                  style={{
                    display: "flex",
                    width: "50%",
                    margin: "auto",
                    justifyContent: "space-around"
                  }}
                >
                  <EditNum itemId={itemId} />
                  <button
                    onClick={() => handleDeleteItem(itemId)}
                    style={{
                      backgroundColor: "#f1f1f1",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>
                </div>
                <hr />
              </div>
            ))}
            <button
              style={styles.order}
              onClick={() => {
                if (Object.keys(cart).length !== 0) {
                  handleOrder(() => history.push(`/users/${ownInfo._id}`));
                }
              }}
            >
              Place Order
            </button>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>Cart is Empty</p>
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
      handleDeleteItem,
      handleOrder
    },
    dispatch
  );
};

const styles = {
  order: {
    display: "block",
    width: "100%",
    border: "none",
    backgroundColor: "#DADADA",
    padding: "14px 28px",
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "center",
    borderRadius: "10px"
  }
};

Cart = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default Cart;
