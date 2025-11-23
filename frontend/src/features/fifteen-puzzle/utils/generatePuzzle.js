import checkSolvable from "./checkSolvable.js";

// Generates a random solvable 4x4 board
export default function generatePuzzle() {
  let board;

  do {
    board = shuffleArray([...Array(16).keys()]); // numbers 0–15
  } while (!checkSolvable(board));

  return board;
}

// Fisher–Yates shuffle
function shuffleArray(arr) {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}
