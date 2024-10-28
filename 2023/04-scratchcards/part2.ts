import { readFileSync } from "node:fs";

const buffer = readFileSync("src/04-scratchcards/input.txt");
const input = buffer.toString().split("\n");
const newInput = input.map((line) => {
  const [_, numbers] = line.split(": ");
  return numbers;
});

let sum = 0;

function splitNumbersAmount(numbers: string) {
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
  return actualNumbers.reduce((prev, num) => {
    return winningNumbers.includes(num) ? prev + 1 : prev;
  }, 0);
}

function recursiveList(input: string[], start: number) {
  for (let i = 0; i < input.length; i++) {
    const amount = splitNumbersAmount(input[i]);
    const slice = newInput.slice(start + i + 1, start + i + 1 + amount);
    sum += 1;
    recursiveList(slice, start + i + 1);
  }
}

recursiveList(newInput, 0);

console.log(sum); // This takes so much but it's honest work!
