import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2024/01-historian-hysteria/input.txt");
const parsed = buffer.toString();
const lines = parsed.split("\n");
const list1 = [];
const list2 = [];
let dist = 0;

for (let i = 0; i < lines.length; i++) {
  const both = lines[i].split("   ");
  list1.push(+both[0]);
  list2.push(+both[1]);
}

list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

for (let i = 0; i < lines.length; i++) {
  dist += Math.abs(list1[i] - list2[i]);
}

console.timeEnd("bench");

console.log(dist);
