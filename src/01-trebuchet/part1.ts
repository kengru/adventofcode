import { readFileSync } from "node:fs";

const buffer = readFileSync("src/01-trebuchet/input.txt");
const input = buffer.toString().split("\n");

const cValues = input.map((line) => {
  let cValue = 0;
  const numbers = line.split("").filter((char) => parseInt(char));
  const len = numbers.length;
  if (len === 1) {
    cValue = parseInt(numbers[0] + numbers[0]);
  }
  if (len > 1) {
    cValue = parseInt(numbers[0] + numbers[len - 1]);
  }

  return cValue;
});

const calibration = cValues.reduce((acc, curr) => acc + curr, 0);

console.log(calibration);
