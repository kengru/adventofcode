import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2015/05-nice-string/input.txt");
const strs = buffer.toString().split("\n");

function cantContain(val: string): boolean {
  return ["ab", "cd", "pq", "xy"].some((v) => val.includes(v));
}

function hasVowels(val: string): boolean {
  return (
    val
      .split("")
      .reduce(
        (prev, cur) =>
          ["a", "e", "i", "o", "u"].includes(cur) ? prev + 1 : prev,
        0
      ) > 2
  );
}

function duplicated(val: string): boolean {
  return Array.prototype.some.call(val, (v, idx) => v === val[idx + 1]);
}

const nices = strs.reduce((prev, cur) => {
  if (cantContain(cur) || !hasVowels(cur) || !duplicated(cur)) {
    return prev;
  }
  return prev + 1;
}, 0);

console.timeEnd("bench");

console.log(nices);
