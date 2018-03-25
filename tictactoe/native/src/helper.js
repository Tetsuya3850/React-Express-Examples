export const judgeWinHelper = ticTacToe => {
  let hasWon = false;

  for (let i = 0; i < 9; i += 3) {
    if (
      ticTacToe[i] === ticTacToe[i + 1] &&
      ticTacToe[i] === ticTacToe[i + 2] &&
      ticTacToe[i] !== null
    ) {
      hasWon = true;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      ticTacToe[i] === ticTacToe[i + 3] &&
      ticTacToe[i] === ticTacToe[i + 6] &&
      ticTacToe[i] !== null
    ) {
      hasWon = true;
    }
  }

  if (
    ticTacToe[0] === ticTacToe[4] &&
    ticTacToe[0] === ticTacToe[8] &&
    ticTacToe[0] !== null
  ) {
    hasWon = true;
  }

  if (
    ticTacToe[2] === ticTacToe[4] &&
    ticTacToe[2] === ticTacToe[6] &&
    ticTacToe[2] !== null
  ) {
    hasWon = true;
  }

  return hasWon;
};

export const judgeFairHelper = ticTacToe => {
  let isFair = true;
  ticTacToe.forEach(function(cell) {
    if (cell === null) {
      isFair = false;
    }
  });
  return isFair;
};
