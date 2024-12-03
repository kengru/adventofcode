import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2024/02-/input.txt");
const parsed = buffer.toString().split("\n");
let safe = 0;

for (let i = 0; i < parsed.length; i++) {
  const levels = parsed[i].split(" ").map((v) => +v);
  const isDesc = levels.every((v, idx) => {
    if (idx === levels.length - 1) {
      return true;
    }
    return levels[idx] > levels[Math.min(idx + 1, levels.length - 1)];
  });
  const isAsc = levels.every((v, idx) => {
    if (idx === levels.length - 1) {
      return true;
    }
    return levels[idx] < levels[idx + 1];
  });
  if (isAsc || isDesc) {
    const last = levels.every((v, idx) => {
      if (idx === levels.length - 1) {
        return true;
      }
      const val = Math.abs(levels[idx] - levels[idx + 1]);
      return val > 0 && val <= 3;
    });
    if (last) {
      safe++;
    }
  }
}

console.log(safe);

console.timeEnd("bench");
