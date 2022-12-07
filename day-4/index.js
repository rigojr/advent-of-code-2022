/**
 * https://adventofcode.com/2022/day/4
 */

const fs = require('fs');

const split2 = require('split2');

const pathToFile = './input.txt';

function isContain(first, second) {
  const firstRange = first.split('-');
  const secondRange = second.split('-');

  return parseInt(firstRange[0]) <= parseInt(secondRange[0]) &&
    parseInt(firstRange[1]) >= parseInt(secondRange[1])
}

function isOverlap(first, second) {
  const firstRange = first.split('-');
  const secondRange = second.split('-');

  const firstNumberStart = parseInt(firstRange[0]);
  const firstNumberEnd = parseInt(firstRange[1]);

  const secondNumberStart = parseInt(secondRange[0]);
  const secondNumberEnd = parseInt(secondRange[1]);

  const firstCollection = new Array(1 + (firstNumberEnd - firstNumberStart))
    .fill(0)
    .map((_value, index) => index + firstNumberStart);

  const secondCollection = new Array(1 + (secondNumberEnd - secondNumberStart))
    .fill(0)
    .map((_value, index) => index + secondNumberStart);

  return firstCollection.some((value) => secondCollection.includes(value)) ||
    secondCollection.some((value) => firstCollection.includes(value))
}

let countContainedAssignments = 0;
let countOverlapAssignments = 0;

fs.createReadStream(pathToFile)
  .pipe(split2())
  .on('data', (row) => {
    const assignments = row.split(',');
    const firstAssignment = assignments[0];
    const secondAssignment = assignments[1];

    if (isContain(firstAssignment, secondAssignment) || isContain(secondAssignment, firstAssignment)) {
      countContainedAssignments = countContainedAssignments + 1;
    }

    if (isOverlap(firstAssignment, secondAssignment)) {
      countOverlapAssignments = countOverlapAssignments + 1;
    }
  })
  .on('end', () => console.log(`${countContainedAssignments} - ${countOverlapAssignments}`));