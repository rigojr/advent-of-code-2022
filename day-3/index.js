/**
 * https://adventofcode.com/2022/day/3
 */

/**
 * Lowercase item types a through z have priorities 1 through 26.
 * Uppercase item types A through Z have priorities 27 through 52.
 *
 * ASCII A = 65 ; Z = 90 ; a = 97 ; z = 122
 *
 * A - Z -> 38
 * a - z -> 96
 */

const fs = require('fs');

const split2 = require('split2');

const pathToInput = './input.txt';

function findRepeatedType(first, second) {
  let repeatedCharacter;

  first.some((firstCharacter) => {
    return second.some((secondCharacter) => {
      const result = firstCharacter === secondCharacter;

      if (result) {
        repeatedCharacter = firstCharacter;
      }

      return result;
    });
  });

  return repeatedCharacter;
}

function findRepeatedType3(first, second, third) {
  let repeatedCharacter;

  first.some((firstCharacter) => {
    return second.some((secondCharacter) => {
      return third.some((thirdCharacter) => {
        const result =
          firstCharacter === secondCharacter &&
          firstCharacter === thirdCharacter;

        if (result) {
          repeatedCharacter = firstCharacter;
        }

        return result;
      });
    });
  });

  return repeatedCharacter;
}

function calculatePrioritySum(typeCollection) {
  return typeCollection.reduce((prev, curr) => {
    const ascii = curr.charCodeAt(0);

    if (ascii >= 97) {
      return prev + (ascii - 96);
    }

    return prev + (ascii - 38);
  }, 0);
}

const repeatedTypes = [];
const rawGroups = [];

fs.createReadStream(pathToInput)
  .pipe(split2())
  .on('data', (chunk) => {
    const row = chunk.toString().split('');
    const middleIndex = row.length / 2;
    const first = row.slice(0, middleIndex);
    const second = row.slice(middleIndex, row.length);

    // repeatedTypes.push(findRepeatedType(first, second));
    rawGroups.push(row);
  })
  .on('end', () => {
    const trioGroups = [];

    let trios = [];

    rawGroups.forEach((value, index) => {
      if (index % 3 === 0) {
        trioGroups.push(trios);
        trios = [];
      }

      trios.push(value);

      if (index === rawGroups.length - 1) {
        trioGroups.push(trios);
      }
    });

    trioGroups.shift();

    trioGroups.forEach((trio) => {
      repeatedTypes.push(findRepeatedType3(trio[0], trio[1], trio[2]));
    });

    console.log(calculatePrioritySum(repeatedTypes));
  });

// FIXME: found a better way to group trios and a better algorithm to calculate repeatedType.
