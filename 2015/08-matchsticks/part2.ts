import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2015/08-matchsticks/input.txt");
const literals = buffer.toString().split("\n");

let sum = 0;

for (let i = 0; i < literals.length; i++) {
  const line = literals[i];
  const chc = line.length;
  let count = 2;
  for (let j = 0; j < chc; j++) {
    if (line[j] === '"' || line[j] === "\\") {
      count += 2;
    } else {
      count += 1;
    }
  }
  sum += count - chc;
}

console.timeEnd("bench");

console.log(sum);
