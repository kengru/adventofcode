import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2024/03-mull-it-over/input.txt");
const parsed = buffer.toString();
const mults = /mul\(\d{1,3},\d{1,3}\)/g;
const multidxs = [];
const dodonts = /do\(\)|don't\(\)/g;
const doidxs = [];
let total = 0;
let match = null;

function calc(tc: string): number {
  tc = tc.replace("mul(", "");
  tc = tc.replace(")", "");
  const [n1, n2] = tc.split(",");
  return +n1 * +n2;
}

while ((match = mults.exec(parsed)) != null) {
  multidxs.push([match[0], match.index]);
}
while ((match = dodonts.exec(parsed)) != null) {
  doidxs.push([match[0], match.index]);
}

let doidx = 0;
let toggle = true;
for (let i = 0; i < multidxs.length; i++) {
  const cur = multidxs[i];
  const dos = doidxs[Math.min(doidx, doidxs.length - 1)];
  if (cur[1] > dos[1]) {
    toggle = dos[0] !== "don't()";
    doidx += 1;
  }
  if (toggle) {
    total += calc(cur[0] as string);
  }
}

console.timeEnd("bench");

console.log(total);
