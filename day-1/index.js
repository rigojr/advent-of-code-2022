/**
 * https://adventofcode.com/2022/day/1
 */

const fs = require('fs');

const split2 = require('split2');

const pathToInput = 'input.txt';

const elfs = [];

let currentElf = 0;

function sortDescending(a, b) {
  return b - a;
}

function theMost() {
  const safeCopy = [...elfs].sort(sortDescending);

  const most = safeCopy[0];
  const mostIndex = elfs.findIndex((elf) => elf === most);

  console.log(`The elf with most calories is the ${mostIndex} with ${most} calories`);
}

function theTop3() {
  const safeCopy = [...elfs].sort(sortDescending);

  console.log(`Total top 3: ${safeCopy[0] + safeCopy[1] + safeCopy[2]}`);
}

fs.createReadStream(pathToInput)
  .pipe(split2())
  .on('data', (chunk) => {
    if (chunk === '') {
      elfs.push(currentElf);

      currentElf = 0;
    } else {
      currentElf = parseInt(chunk) + currentElf;
    }
  })
  .on('end', () => {
    theMost();
    theTop3();
  });