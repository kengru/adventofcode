import { readFileSync } from "node:fs";
import { getFirstNumber, getLastNumber, strToNum } from "./utils";

console.time("bench");

const buffer = readFileSync("2023/01-trebuchet/input.txt");
const input = buffer.toString().split("\n");

const cValues = input.map((line) => {
  const f = getFirstNumber(line);
  const l = getLastNumber(line);

  return strToNum(f, l);
});

const calibration = cValues.reduce((acc, curr) => acc + curr, 0);

console.timeEnd("bench");

console.log(calibration);
