import React, { Component } from "react";
import { connect } from "react-redux";
import { receiveUserSweets } from "../redux/userSweets";
import SweetContainer from "./SweetContainer";

class Profile extends Component {
  componentDidMount() {
    const { match, dispatch } = this.props;
    dispatch(receiveUserSweets(match.params.uid));
  }
  render() {
    const { match, userSweets } = this.props;
    if (userSweets[match.params.uid] === undefined) {
      userSweets[match.params.uid] = [];
    }
    return (
      <div>
        {userSweets.isFetching ? (
          <p style={{ textAlign: "center" }}>LOADING</p>
        ) : (
          <div>
            <p style={{ textAlign: "center" }}>
              {match.params.uid}&#39;s Sweets
            </p>
            {userSweets[match.params.uid].map(sweetId => (
              <SweetContainer key={sweetId} sweetId={sweetId} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ userSweets }) => {
  return { userSweets };
};

Profile = connect(mapStateToProps, null)(Profile);

export default Profile;
