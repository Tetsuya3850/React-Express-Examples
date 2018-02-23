import React from "react";
import { connect } from "react-redux";
import actions from "../actions";
import Cell from "./Cell";
import GameState from "./GameState";

let TicTacToe = ({ ticTacToe, turn, hasWon, isFair, onMove }) => (
  <div style={styles.container}>
    <h1 style={styles.title}>Tic Tac Toe</h1>
    <div style={styles.ticTacToe}>
      {ticTacToe.map((cell, index) => (
        <Cell
          key={index}
          pos={index}
          state={cell}
          turn={turn}
          hasWon={hasWon}
          isFair={isFair}
          onMoveClick={() => onMove(index, turn)}
        />
      ))}
    </div>
    <GameState turn={turn} hasWon={hasWon} isFair={isFair} />
  </div>
);

const styles = {
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
    borderWidth: "0.02px"
  },
  gameState: {
    textAlign: "center"
  },
  playAgain: {
    cursor: "pointer"
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
