import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2024/05-print-queue/input.txt");
const parsed = buffer.toString().split("\n");
const inupdates: string[][] = [];
const rules = new Map<string, string[]>();
const orules = new Map<string, string[]>();
let st = 0;
let total = 0;

for (let i = 0; i < parsed.length; i++) {
  if (parsed[i].length === 0) {
    st = i;
    break;
  }
  const [before, after] = parsed[i].split("|");
  const rule = rules.get(before);
  const orule = orules.get(after);
  if (!rule) {
    rules.set(before, [after]);
  } else {
    rules.set(before, [...rule, after]);
  }
  if (!orule) {
    orules.set(after, [before]);
  } else {
    orules.set(after, [...orule, before]);
  }
}

function isCorrect(update: string[]): boolean {
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
  return correct;
}

for (let i = st + 1; i < parsed.length; i++) {
  const update = parsed[i].split(",");
  const correct = isCorrect(update);
  if (!correct) {
    inupdates.push(update);
  }
}

for (let i = 0; i < inupdates.length; i++) {
  const iu = inupdates[i];
  while (!isCorrect(iu)) {
    let j = 0;
    while (j < iu.length) {
      let check = false;
      const m = orules.get(iu[j]);
      if (!m) {
        j += 1;
        continue;
      }
      for (let l = 0; l < iu.length; l++) {
        const comp = iu[l];
        if (m.includes(comp) && j < l) {
          const copy = iu[j];
          iu[j] = comp;
          iu[l] = copy;
          check = true;
          break;
        }
      }
      if (check) {
        break;
      }
      j += 1;
    }
  }
  total += +iu[Math.floor(iu.length / 2)];
}

console.log(total);

console.timeEnd("bench");
