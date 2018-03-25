import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const GameState = ({ turn, hasWon, isFair, onNewGameClick }) => {
  let renderTurn = turn ? <Text>&#9675;</Text> : <Text>&#10799;</Text>;

  let gameState = null;
  if (hasWon) {
    gameState = <Text>{renderTurn} has Won!</Text>;
  } else if (isFair) {
    gameState = <Text>Game is Fair!</Text>;
  } else {
    gameState = <Text>{renderTurn} &#39;s Turn</Text>;
  }

  let playAgain = <Text />;
  if (hasWon || isFair) {
    playAgain = (
      <TouchableOpacity onPress={onNewGameClick}>
        <Text>Play Again?</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.gameState}>
      <View>{gameState}</View>
      <View style={styles.playAgain}>{playAgain}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameState: {
    alignItems: "center"
  },
  playAgain: {
    marginTop: 10
  }
});

export default GameState;
