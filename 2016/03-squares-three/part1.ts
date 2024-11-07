import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2016/03-squares-three/input.txt");
const triangles = buffer.toString().split("\n");
let sum = 0;

function getNumbers(val: string): number[] {
  return val
    .split("  ")
    .map((n) => +n.trim())
    .filter((v) => v !== 0);
}

for (let i = 0; i < triangles.length; i++) {
  const values = getNumbers(triangles[i]);
  let possible = true;
  for (let j = 0; j < values.length; j++) {
    let p1 = values[j];
    let p2 = j + 1 > values.length - 1 ? values[0] : values[j + 1];
    let remaining = values.filter((v) => v != p1 && v != p2)[0];
    if (p1 + p2 <= remaining) {
      possible = false;
    }
  }
  sum += possible ? 1 : 0;
}

console.timeEnd("bench");

console.log(sum);
