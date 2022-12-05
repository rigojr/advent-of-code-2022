/**
 * https://adventofcode.com/2022/day/2
 */

const fs = require('fs');

const split2 = require('split2');

const pathToInput = './input.txt'

let points = 0;

/**
 * A for Rock, B for Paper, and C for Scissors.
 * X for Rock, Y for Paper, and Z for Scissors.
 * (1 for Rock, 2 for Paper, and 3 for Scissors)
 * (0 if you lost, 3 if the round was a draw, and 6 if you won)
 */

/**
 * Win combination
 * X -> C
 * Y -> A
 * Z -> B
 */

/**
 * Draw combination
 * X -> A
 * Y -> B
 * Z -> C
 */

/**
 * Loss combination
 * Z -> A
 * Y -> C
 * X -> B
 */

// function isWin(myPlay, opponentPlay) {
//   return myPlay === 'X' && opponentPlay === 'C' ||
//   myPlay === 'Y' && opponentPlay === 'A' ||
//   myPlay === 'Z' && opponentPlay === 'B';
// }

// function isDraw(myPlay, opponentPlay) {
//   return myPlay === 'X' && opponentPlay === 'A' ||
//   myPlay === 'Y' && opponentPlay === 'B' ||
//   myPlay === 'Z' && opponentPlay === 'C'
// }

// function getShapePoints(myPlay) {
//   if (myPlay === 'X') {
//     return 1;
//   }

//   if (myPlay === 'Y') {
//     return 2;
//   }

//   return 3;
// }

/**
 * Second part
 */

function getShapePoints(shape) {
  if (shape === 'A') {
    return 1;
  }

  if (shape === 'B') {
    return 2;
  }

  return 3;
}

function getLossPoints(opponentPlay) {
  if (opponentPlay === 'A') {
    return getShapePoints('C');
  }

  if (opponentPlay === 'B') {
    return getShapePoints('A')
  }

  return getShapePoints('B');
}

function getDrawPoints(opponentPlay) {
  return getShapePoints(opponentPlay);
}

function getWinPoints(opponentPlay) {
  if (opponentPlay === 'A') {
    return getShapePoints('B');
  }

  if (opponentPlay === 'B') {
    return getShapePoints('C')
  }

  return getShapePoints('A');
}

function getPoints(myPlay, opponentPlay) {
  if (myPlay === 'X') {
    return 0 + getLossPoints(opponentPlay);
  };

  if (myPlay === 'Y') {
    return 3 + getDrawPoints(opponentPlay);
  }

  return 6 + getWinPoints(opponentPlay);
}

fs.createReadStream(pathToInput)
  .pipe(split2())
  .on('data', (chunk) => {
    const row = chunk.split(' ');
    const opponentPlay = row[0];
    const myPlay = row[1];

    points = points + getPoints(myPlay, opponentPlay);
  })
  .on('end', () => console.log(`Total points: ${points}`));