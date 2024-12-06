import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2024/05-print-queue/input.txt");
const parsed = buffer.toString().split("\n");
const rules = new Map<string, string[]>();
let st = 0;
let total = 0;

for (let i = 0; i < parsed.length; i++) {
  if (parsed[i].length === 0) {
    st = i;
    break;
  }
  const [before, after] = parsed[i].split("|");
  const rule = rules.get(before);
  if (!rule) {
    rules.set(before, [after]);
  } else {
    rules.set(before, [...rule, after]);
  }
}

for (let i = st + 1; i < parsed.length; i++) {
  const update = parsed[i].split(",");
  let j = 0;
  let correct = true;
  while (j < update.length) {
    const m = rules.get(update[j]);
    const tf = update.every((v, idx) => {
      if (!m?.includes(v)) {
        return true;
      }
      return j < idx;
    });
    if (!tf) {
      correct = false;
      break;
    }
    j++;
  }
  total += correct ? +update[Math.floor(update.length / 2)] : 0;
}

console.log(total);

console.timeEnd("bench");
