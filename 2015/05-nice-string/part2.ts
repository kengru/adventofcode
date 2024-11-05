import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2015/05-nice-string/input.txt");
const strs = buffer.toString().split("\n");

function containsPair(val: string): boolean {
  let idx = 0;
  const lts = val.split("");
  for (let v of lts) {
    const pair = `${v}${lts[idx + 1]}`;
    if (val.substring(idx + 2).includes(pair)) {
      return true;
    }
    idx++;
  }
  return false;
}

function jumpsBetween(val: string): boolean {
  let res = false;
  const lts = val.split("");
  lts.forEach((v, idx) => {
    if (v === lts[idx + 2]) {
      res = true;
    }
  });
  return res;
}

const nices = strs.reduce((prev, cur) => {
  if (!containsPair(cur) || !jumpsBetween(cur)) {
    return prev;
  }
  return prev + 1;
}, 0);

console.timeEnd("bench");

console.log(nices);
