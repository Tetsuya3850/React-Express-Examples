import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { reAuthUser, logoutUser } from "../reducer/users";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  componentWillMount() {
    const { reAuthUser, history } = this.props;
    reAuthUser(() => history.push("/auth"));
  }

  render() {
    const { isAuthed, ownInfo, logoutUser, history } = this.props;
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
            <a
              href={`http://localhost:5150/auth/google?linkinguri=${
                window.location.origin
              }/socialauthredirect`}
              style={{ flexGrow: 1, color: "black" }}
            >
              <i className="fa fa-user-circle" aria-hidden="true" />
            </a>
          )}

          <NavLink
            exact
            to={`/cart/${ownInfo._id}`}
            style={{ flexGrow: 1, color: "black" }}
          >
            <i className="fa fa-shopping-cart" aria-hidden="true" />
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      reAuthUser
    },
    dispatch
  );
};

NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export default withRouter(NavBar);
