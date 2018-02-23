import React from "react";

const GameState = ({ turn, hasWon, isFair }) => {
  const renderTurn = turn ? <span>&#9675;</span> : <span>&#10799;</span>;

  let gameState = null;
  if (hasWon) {
    gameState = <p>{renderTurn} has Won!</p>;
  } else if (isFair) {
    gameState = <p>Game is Fair!</p>;
  } else {
    gameState = <p>{renderTurn} &#39;s Turn</p>;
  }

  let playAgain = null;
  if (hasWon || isFair) {
    playAgain = (
      <p
        onClick={() => {
          window.location.reload();
        }}
        style={styles.playAgain}
      >
        Play Again?
      </p>
    );
  }

  return (
    <div style={styles.gameState}>
      <div>{gameState}</div>
      <div>{playAgain}</div>
    </div>
  );
};

const styles = {
  gameState: {
    textAlign: "center"
  },
  playAgain: {
    cursor: "pointer"
  }
};

export default GameState;
