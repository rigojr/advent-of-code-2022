/**
 * https://adventofcode.com/2022/day/5
 */

const fs = require('fs');

const split2 = require('split2');

const pathToFile = './input.txt';

const rawRows = [];
const rawMovements = [];

let isArrange = true;

function storeRawData(chunk) {
  if (chunk === '') {
    isArrange = false;

    return;
  }

  if (isArrange) {
    rawRows.push(chunk);
  } else {
    rawMovements.push(chunk);
  }
}

function parseRawData() {
  const stacksRowIndex = [];
  const stacksIndex = rawRows[rawRows.length - 1];
  const payloadReversed = rawRows.slice(0, rawRows.length - 1);

  let stacksCount = 0

  stacksIndex
    .split('')
    .forEach((character, index) => {
      if (character !== ' ') {
        stacksCount = stacksCount + 1;
        stacksRowIndex.push(index);
      }
    });

  return Array(stacksCount).fill('')
    .map((_value, index) => {
      return payloadReversed.map((value) => {
        return value.charAt(stacksRowIndex[index])
      })
      .filter((value) => value !== ' ')
      .reverse();
    });
}

function parseMovements() {
  return rawMovements.map((value) => {
    return value
      .split(' ')
      .filter((character) => !isNaN(parseInt(character)))
      .map((value) => parseInt(value));
  })
}

function doArrange(data, movements) {
  const safeDataCopy = [...data];

  movements.forEach((movement) => {
    const count = movement[0];
    const from = movement[1] - 1;
    const to = movement[2] - 1;

    // for (let done = 0; done < count; done++) {
    //   const element = safeDataCopy[from].pop();

    //   if (element !== undefined) {
    //     safeDataCopy[to].push(element);
    //   }
    // }

    const payload = safeDataCopy[from].slice(-1 * count);

    safeDataCopy[from] = safeDataCopy[from].slice(0, safeDataCopy[from].length - count);
    safeDataCopy[to] = [ ...safeDataCopy[to], ...payload ]
  });

  return safeDataCopy;
}

fs.createReadStream(pathToFile)
  .pipe(split2())
  .on('data', (chunk) => {
    storeRawData(chunk);
  })
  .on('end', () => {
    const data = parseRawData();
    const movements = parseMovements();

    console.log(doArrange(data, movements)
      .map((collection) => collection[collection.length - 1])
      .join('')
    );
  });