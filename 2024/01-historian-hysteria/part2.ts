import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2024/01-historian-hysteria/input.txt");
const parsed = buffer.toString();
const lines = parsed.split("\n");
const list1: number[] = [];
const list2: number[] = [];
let similarity = 0;

for (let i = 0; i < lines.length; i++) {
  const both = lines[i].split("   ");
  list1.push(+both[0]);
  list2.push(+both[1]);
}

for (let i = 0; i < list1.length; i++) {
  const times = list2.reduce(
    (prev, curr) => (list1[i] === curr ? prev + 1 : prev),
    0
  );
  const sim = list1[i] * times;

  similarity += sim;
}

console.timeEnd("bench");

console.log(similarity);
