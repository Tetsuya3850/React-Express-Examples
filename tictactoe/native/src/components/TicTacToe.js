import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { processMove, newGame } from "../reducer";
import Cell from "./Cell";
import GameState from "./GameState";

const SCREEN_WIDTH = Dimensions.get("window").width;

let TicTacToe = ({ ticTacToe, turn, hasWon, isFair, processMove, newGame }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Tic Tac Toe</Text>
    <View style={styles.ticTacToe}>
      {ticTacToe.map((cell, index) => (
        <Cell
          key={index}
          move={cell}
          hasWon={hasWon}
          isFair={isFair}
          onMoveClick={() => processMove(index, turn)}
        />
      ))}
    </View>
    <View style={styles.gameState}>
      <GameState
        turn={turn}
        hasWon={hasWon}
        isFair={isFair}
        onNewGameClick={newGame}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 20
  },
  ticTacToe: {
    width: 300.6,
    height: 300.6,
    display: "flex",
    flexWrap: "wrap"
  },
  gameState: {
    marginTop: 20
  }
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ processMove, newGame }, dispatch);
};

TicTacToe = connect(mapStateToProps, mapDispatchToProps)(TicTacToe);

export default TicTacToe;
