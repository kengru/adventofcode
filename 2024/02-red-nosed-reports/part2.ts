import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2024/02-/input.txt");
const parsed = buffer.toString().split("\n");
let safe = 0;

function isSafe(levels: number[]): boolean {
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
      return true;
    }
  }
  return false;
}

function dampener(levels: number[]): boolean {
  let stillWrong = true;
  for (let j = 0; j < levels.length; j++) {
    const newLvl = levels.slice();
    newLvl.splice(j, 1);
    const is = isSafe(newLvl);
    if (is) {
      stillWrong = false;
      break;
    }
  }
  return !stillWrong;
}

for (let i = 0; i < parsed.length; i++) {
  const levels = parsed[i].split(" ").map((v) => +v);
  const is = isSafe(levels);
  if (!is) {
    if (dampener(levels)) {
      safe += 1;
    }
  } else {
    safe += 1;
  }
}

console.log(safe);

console.timeEnd("bench");
