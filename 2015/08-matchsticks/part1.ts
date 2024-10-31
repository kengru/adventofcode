import { readFileSync } from "node:fs";

const buffer = readFileSync("2015/08-matchsticks/input.txt");
const literals = buffer.toString().split("\n");

console.time("t");

let sum = 0;

for (let i = 0; i < literals.length; i++) {
  const line = literals[i];
  const chc = line.length;
  const data = line.slice(1, line.length - 1);
  let count = 0;
  for (let j = 0; j < data.length; j++) {
    if (data[j] === "\\") {
      if (data[j + 1] === "x") {
        const val = `${data.slice(j, j + 4)}`;
        // const k = parseInt(`0x${val}`, 16).toString();
        j += 3;
        count += 1;
        continue;
      } else {
        j++;
        count += 1;
        continue;
      }
    }
    count += 1;
  }
  sum += chc - count;
}

console.log(sum);

console.timeEnd("t");
