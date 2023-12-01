import { readFileSync } from "node:fs";
import { getFirstNumber, getLastNumber, strToNum } from "./utils";

const buffer = readFileSync("src/01-trebuchet/input.txt");
// const buffer = readFileSync("src/01-trebuchet/test-input.txt");
const input = buffer.toString().split("\n");

const cValues = input.map((line) => {
  const f = getFirstNumber(line);
  const l = getLastNumber(line);

  return strToNum(f, l);
});

const calibration = cValues.reduce((acc, curr) => acc + curr, 0);

console.log(calibration);

// These are all the wrong answers I got
// 47869
// 53168
// 53148
// 54442
// 53796
// 53888
