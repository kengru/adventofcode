import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2024/04-ceres-search/input.txt");
const parsed = buffer.toString().split("\n");
const flt: string[][] = [];
const mas = "MAS";
const sam = "SAM";
let count = 0;

for (let i = 0; i < parsed.length; i++) {
  const n = parsed[i].split("");
  flt.push(n);
}

for (let i = 0; i < flt.length; i++) {
  for (let j = 0; j < flt[i].length; j++) {
    if (flt[i][j] === "A") {
      count += diagonal(i, j);
    }
  }
}

function diagonal(row: number, column: number): number {
  if (row + 1 > flt.length - 1 || row - 1 < 0) {
    return 0;
  }
  if (column + 1 > flt[row].length - 1 || column - 1 < 0) {
    return 0;
  }
  let value = 0;
  let is = "";
  is += flt[Math.max(row - 1, 0)][Math.max(column - 1, 0)];
  is += flt[row][column];
  is +=
    flt[Math.min(row + 1, flt.length - 1)][
      Math.min(column + 1, flt[row + 1].length)
    ];
  value += is === mas ? 1 : is === sam ? 1 : 0;
  is = "";
  is += flt[Math.max(row - 1, 0)][Math.min(column + 1, flt[row - 1].length)];
  is += flt[row][column];
  is += flt[Math.min(row + 1, flt.length - 1)][Math.max(column - 1, 0)];
  value += is === mas ? 1 : is === sam ? 1 : 0;
  return value > 1 ? 1 : 0;
}

console.log(count);

console.timeEnd("bench");
