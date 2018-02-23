import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../actions";
import Cell from "./Cell";

class TicTacToe extends Component {
  render() {
    const { ticTacToe, turn, hasWon, isFair, onMove } = this.props;
    const renderTurn = turn ? <span>&#9675;</span> : <span>&#10799;</span>;
    let gameState = null;
    if (hasWon) {
      gameState = <p>{renderTurn} has Won!</p>;
    } else if (isFair) {
      gameState = <p>Game is Fair!</p>;
    } else {
      gameState = <p>{renderTurn} &#39;s Turn</p>;
    }

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
              hasWon={hasWon}
              isFair={isFair}
              onMoveClick={() => onMove(index, turn)}
            />
          ))}
        </div>
        <div style={styles.gameState}>
          <div>{gameState}</div>
          <div>
            {hasWon || isFair ? (
              <p
                onClick={() => {
                  window.location.reload();
                }}
                style={styles.playAgain}
              >
                Play Again?
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
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
