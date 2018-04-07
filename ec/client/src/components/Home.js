import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  handleFetchListItems,
  handleFetchListCategory,
  handleFetchListSearch
} from "../reducer/list";
import Search from "./Search";
import Category from "./Category";
import ItemContainer from "./ItemContainer";

class Home extends Component {
  componentDidMount() {
    this.props.handleFetchListItems();
  }
  render() {
    const {
      isFetching,
      error,
      itemIds,
      handleFetchListItems,
      handleFetchListCategory,
      handleFetchListSearch
    } = this.props;
    return (
      <div>
        <Search
          handleFetchListSearch={handleFetchListSearch}
          handleFetchListItems={handleFetchListItems}
        />
        <Category
          handleFetchListCategory={handleFetchListCategory}
          handleFetchListItems={handleFetchListItems}
        />
        {isFetching ? (
          <p style={{ textAlign: "center" }}>LOADING</p>
        ) : (
          <div>
            {itemIds.map(itemId => (
              <ItemContainer key={itemId} itemId={itemId} />
            ))}
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
      handleFetchListItems,
      handleFetchListCategory,
      handleFetchListSearch
    },
    dispatch
  );
};

Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;
