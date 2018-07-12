import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    const { isAuthed, ownInfo, cart } = this.props;
    return (
      <div>
        <div style={{ display: "flex", margin: "10px" }}>
          <NavLink
            exact
            to="/"
            style={{ flexGrow: 10, textDecoration: "none", color: "black" }}
          >
            <i className="fa fa-amazon" aria-hidden="true" />
            <span style={{ margin: "3px" }}>MyMart</span>
          </NavLink>
          {isAuthed ? (
            <NavLink
              exact
              to={`/users/${ownInfo._id}`}
              style={{ flexGrow: 1, color: "black" }}
            >
              <i className="fa fa-user-circle" aria-hidden="true" />
            </NavLink>
          ) : (
            <NavLink to={`/auth`} style={{ flexGrow: 1, color: "black" }}>
              <i className="fa fa-user-circle" aria-hidden="true" />
            </NavLink>
          )}

          <NavLink
            exact
            to={`/cart/${ownInfo._id}`}
            style={{ flexGrow: 1, color: "black" }}
          >
            {Object.keys(cart).length === 0 ? (
              <i className="fa fa-shopping-cart" aria-hidden="true" />
            ) : (
              <i className="fa fa-cart-plus" aria-hidden="true" />
            )}
          </NavLink>
        </div>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return users;
};

NavBar = connect(mapStateToProps, null)(NavBar);

export default withRouter(NavBar);
