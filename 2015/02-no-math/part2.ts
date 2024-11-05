import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2015/02-no-math/input.txt");
const presents = buffer.toString().split("\n");

const total = presents.reduce((prev, cur) => {
  const dims = cur
    .split("x")
    .map((d) => +d)
    .sort((a, b) => a - b);
  const rw = 2 * dims[0] + 2 * dims[1];
  const bow = dims[0] * dims[1] * dims[2];
  return prev + rw + bow;
}, 0);

console.timeEnd("bench");

console.log(total);
