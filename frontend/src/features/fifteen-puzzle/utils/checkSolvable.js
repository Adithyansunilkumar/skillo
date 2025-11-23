// Checks if a 4x4 puzzle is solvable
export default function checkSolvable(arr) {
  let inversions = 0;

  // Count inversions (ignore 0)
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] !== 0 && arr[j] !== 0 && arr[i] > arr[j]) {
        inversions++;
      }
    }
  }

  const gridSize = 4;
  const emptyIndex = arr.indexOf(0);
  const emptyRowFromBottom = gridSize - Math.floor(emptyIndex / gridSize);

  // For a 4x4 puzzle:
  // Solvable when:
  // If the blank is on an even row counting from bottom -> inversions must be odd
  // If the blank is on an odd row counting from bottom -> inversions must be even
  if (emptyRowFromBottom % 2 === 0) {
    return inversions % 2 === 1;
  } else {
    return inversions % 2 === 0;
  }
}
