import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../actions";
import Cell from "./Cell";

class TicTacToe extends Component {
  render() {
    const { ticTacToe, turn, hasWon, onMove } = this.props;
    const renderTurn = this.props.turn ? (
      <span>&#9675;</span>
    ) : (
      <span>&#10799;</span>
    );
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Tic Tac Toe</h1>
        <div style={styles.ticTacToe}>
          {ticTacToe.map((cell, index) => (
            <Cell
              key={index}
              pos={index}
              state={cell}
              turn={turn}
              onMoveClick={() => onMove(index, turn)}
            />
          ))}
        </div>
        <p style={styles.gameState}>{renderTurn}s Turn</p>
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
  },
  gameState: {
    textAlign: "center"
  }
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    onMove: (pos, turn) => {
      dispatch(actions.processMove(pos, turn));
    }
  };
};

TicTacToe = connect(mapStateToProps, mapDispatchToProps)(TicTacToe);

export default TicTacToe;
