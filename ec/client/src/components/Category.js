import React, { Component } from "react";

class Category extends Component {
  state = {
    choice: ""
  };

  onChangeCategory = e => {
    this.setState({ choice: e.target.value });
    if (e.target.value === "") {
      this.props.handleFetchListItems();
      return;
    }
    this.props.handleFetchListCategory(e.target.value);
  };

  render() {
    const category_chocies = [
      "Books",
      "Fashion",
      "Electronics",
      "CDs & DVDs",
      "Foods & Beverages"
    ];

    const allCategoryChoices = category_chocies.map(choice => (
      <option key={choice} value={choice}>
        {choice}
      </option>
    ));

    return (
      <div style={{ textAlign: "center", margin: "10px" }}>
        <select onChange={this.onChangeCategory} value={this.state.choice}>
          <option value="">All</option>
          {allCategoryChoices}
        </select>
        <br />
      </div>
    );
  }
}

export default Category;
