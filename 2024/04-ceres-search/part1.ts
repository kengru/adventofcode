import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2024/04-ceres-search/input.txt");
const parsed = buffer.toString().split("\n");
const flt: string[][] = [];
const xmas = "XMAS";
const samx = "SAMX";
let count = 0;

for (let i = 0; i < parsed.length; i++) {
  const n = parsed[i].split("");
  flt.push(n);
}

for (let i = 0; i < flt.length; i++) {
  for (let j = 0; j < flt[i].length; j++) {
    if (flt[i][j] === "X") {
      count += forwards(i, j) ? 1 : 0;
      count += backwards(i, j) ? 1 : 0;
      count += upwards(i, j) ? 1 : 0;
      count += downwards(i, j) ? 1 : 0;
      count += diagonal(i, j);
    }
  }
}

function forwards(row: number, column: number): boolean {
  let is = "";
  for (let i = 0; i < xmas.length; i++) {
    is += flt[row][Math.min(column + i, flt[row].length - 1)];
  }
  return is === xmas ? true : is === samx;
}
function backwards(row: number, column: number): boolean {
  let is = "";
  for (let i = 0; i < xmas.length; i++) {
    is += flt[row][Math.max(column - i, 0)];
  }
  return is === xmas ? true : is === samx;
}
function downwards(row: number, column: number): boolean {
  let is = "";
  for (let i = 0; i < xmas.length; i++) {
    is += flt[Math.min(row + i, flt.length - 1)][column];
  }
  return is === xmas ? true : is === samx;
}
function upwards(row: number, column: number): boolean {
  let is = "";
  for (let i = 0; i < xmas.length; i++) {
    is += flt[Math.max(row - i, 0)][column];
  }
  return is === xmas ? true : is === samx;
}
function diagonal(row: number, column: number): number {
  let value = 0;
  let is = "";
  for (let i = 0; i < xmas.length; i++) {
    if (row - i < 0 || column - i < 0) {
      break;
    }
    is += flt[Math.max(row - i, 0)][Math.max(column - i, 0)];
  }
  value += is === xmas ? 1 : is === samx ? 1 : 0;
  is = "";
  for (let i = 0; i < xmas.length; i++) {
    if (row - i < 0 || column + i > flt[i].length - 1) {
      break;
    }
    is += flt[Math.max(row - i, 0)][Math.min(column + i, flt[i].length - 1)];
  }
  value += is === xmas ? 1 : is === samx ? 1 : 0;
  is = "";
  for (let i = 0; i < xmas.length; i++) {
    if (row + i > flt.length - 1 || column - i < 0) {
      break;
    }
    is += flt[Math.min(row + i, flt.length - 1)][Math.max(column - i, 0)];
  }
  value += is === xmas ? 1 : is === samx ? 1 : 0;
  is = "";
  for (let i = 0; i < xmas.length; i++) {
    if (row + i > flt.length - 1 || column + i > flt[i].length - 1) {
      break;
    }
    is +=
      flt[Math.min(row + i, flt.length - 1)][
        Math.min(column + i, flt[i].length - 1)
      ];
  }
  value += is === xmas ? 1 : is === samx ? 1 : 0;
  return value;
}

console.log(count);

console.timeEnd("bench");
