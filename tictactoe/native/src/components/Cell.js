import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Cell = ({ move, hasWon, isFair, onMoveClick }) => {
  const handleMoveClick = () => {
    if (hasWon || isFair || move !== null) {
      return;
    }
    onMoveClick();
  };

  let renderState = <Text />;
  if (move === true) {
    renderState = <Text style={styles.mark}>&#9675;</Text>;
  } else if (move === false) {
    renderState = <Text style={styles.mark}>&#10799;</Text>;
  }

  return (
    <TouchableOpacity onPress={handleMoveClick}>
      <View style={styles.cell}>{renderState}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center"
  },
  mark: {
    fontSize: 80
  }
});

export default Cell;
