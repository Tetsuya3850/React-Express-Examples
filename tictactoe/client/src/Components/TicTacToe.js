import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../actions";
import Cell from "./Cell";

class TicTacToe extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Tic Tac Toe</h1>
        <div style={styles.ticTacToe}>
          {this.props.ticTacToe.map((cell, index) => (
            <Cell key={index} pos={index} state={cell} />
          ))}
        </div>
        <p>{this.props.turn}s Turn</p>
      </div>
    );
  }
}

let styles = {
  container: {
    marign: "auto",
    width: 301
  },
  title: {
    textAlign: "center"
  },
  ticTacToe: {
    width: 300.6,
    height: 300.6,
    display: "flex",
    flexWrap: "wrap",
    border: "solid",
    borderWidth: "0.02px",
    borderColor: "black"
  }
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {};
};

TicTacToe = connect(mapStateToProps, mapDispatchToProps)(TicTacToe);

export default TicTacToe;
