import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { handleFetchListItems } from "../reducer/list";

class Home extends Component {
  componentDidMount() {
    this.props.handleFetchListItems();
  }
  render() {
    const { isFetching, error, sweetIds } = this.props;
    return (
      <div>
        {isFetching ? (
          <p style={{ textAlign: "center" }}>LOADING</p>
        ) : (
          <div>
            <p style={{ textAlign: "center", color: "red", marginTop: 10 }}>
              {error}
            </p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ list }) => {
  return list;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleFetchListItems
    },
    dispatch
  );
};

Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;
