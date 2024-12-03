import { readFileSync } from "node:fs";

console.time("bench");

function calc(tc: string): number {
  tc = tc.replace("mul(", "");
  tc = tc.replace(")", "");
  const [n1, n2] = tc.split(",");
  return +n1 * +n2;
}

const buffer = readFileSync("2024/03-mull-it-over/input.txt");
const parsed = buffer.toString();

const inst = parsed.match(/mul\(\d{1,3},\d{1,3}\)/g);
const total = inst?.reduce((prev, curr) => prev + calc(curr), 0);

console.timeEnd("bench");

console.log(total);
