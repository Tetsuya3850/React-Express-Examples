import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { handleEditNum } from "../reducer/users";

class EditNum extends Component {
  state = {
    choice: this.props.num
  };

  onChangeCategory = e => {
    this.props.handleEditNum(this.props.itemId, e.target.value, () => {});
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.num !== this.state.choice) {
      this.setState({ choice: nextProps.num });
    }
  }

  render() {
    const limit = parseInt(this.props.num) + this.props.stock;
    const choice_limit = Math.min(limit, 10);
    const stock_chocies = [...Array(choice_limit).keys()].map(x => (x += 1));

    const allStockChoices = stock_chocies.map(choice => (
      <option key={choice} value={choice}>
        {choice}
      </option>
    ));

    return (
      <div style={{ margin: "10px" }}>
        <select onChange={this.onChangeCategory} value={this.state.choice}>
          {allStockChoices}
        </select>
        <br />
      </div>
    );
  }
}

const mapStateToProps = ({ items, users }, ownProps) => {
  return {
    num: users.cart[ownProps.itemId],
    stock: items[ownProps.itemId].stock
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleEditNum
    },
    dispatch
  );
};

EditNum = connect(mapStateToProps, mapDispatchToProps)(EditNum);

export default EditNum;
