import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { processMove, newGame } from "../reducer";
import Cell from "./Cell";
import GameState from "./GameState";

let TicTacToe = ({ ticTacToe, turn, hasWon, isFair, processMove, newGame }) => (
  <div style={styles.container}>
    <h1 style={styles.title}>Tic Tac Toe</h1>
    <div style={styles.ticTacToe}>
      {ticTacToe.map((cell, index) => (
        <Cell
          key={index}
          move={cell}
          hasWon={hasWon}
          isFair={isFair}
          onMoveClick={() => processMove(index, turn)}
        />
      ))}
    </div>
    <GameState
      turn={turn}
      hasWon={hasWon}
      isFair={isFair}
      onNewGameClick={newGame}
    />
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
  return bindActionCreators({ processMove, newGame }, dispatch);
};

TicTacToe = connect(mapStateToProps, mapDispatchToProps)(TicTacToe);

export default TicTacToe;
