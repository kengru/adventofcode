import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2023/04-scratchcards/input.txt");
const input = buffer.toString().split("\n");

const games = input.reduce((prev, line) => {
  const [_, numbers] = line.split(": ");
  const [winning, actual] = numbers.split(" | ");
  const winningNumbers = winning
    .trim()
    .split(" ")
    .map((num) => +num)
    .filter((num) => num > 0);
  const actualNumbers = actual
    .trim()
    .split(" ")
    .map((num) => +num)
    .filter((num) => num > 0);
  const reduce = actualNumbers.reduce((prev, num) => {
    return winningNumbers.includes(num) ? prev + 1 : prev;
  }, 0);
  const add = reduce > 0 ? 1 * Math.pow(2, reduce - 1) : 0;
  return prev + add;
}, 0);

console.timeEnd("bench");

console.log(games);
