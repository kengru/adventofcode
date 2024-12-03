import { readFileSync } from "node:fs";

type HappinessTable = Record<string, Record<string, number>>;

console.time("bench");

const buffer = readFileSync("2015/13-knights-dinner/input.txt");
const parsed = buffer.toString().split("\n");
const ppl: HappinessTable = {};
let max = 0;

for (let i = 0; i < parsed.length; i++) {
  const line = parsed[i];
  const name = line.split(" would")[0];
  const v = line.split(" happiness")[0];
  const value = line.includes("lose")
    ? -+v.split("lose ")[1]
    : +v.split("gain ")[1];

  const other = line.split("to ")[1];
  const op = other.slice(0, other.length - 1);
  if (!ppl[name]) {
    ppl[name] = {};
  }
  ppl[name][op] = value;
}

const gente = Object.keys(ppl);
const perms: string[][] = [];

function permutator(arr: string[], m: string[] = []) {
  if (arr.length === 0) {
    perms.push(m);
  } else {
    for (let i = 0; i < arr.length; i++) {
      let curr = arr.slice();
      let next = curr.splice(i, 1);
      permutator(curr.slice(), m.concat(next));
    }
  }
}

permutator(gente);

for (let i = 0; i < perms.length; i++) {
  const happy = perms[i].reduce((prev, curr, idx) => {
    if (idx === 0) {
      const left = perms[i][perms[i].length - 1];
      const right = perms[i][idx + 1];
      return prev + ppl[curr][left] + ppl[curr][right];
    }
    if (idx === perms[i].length - 1) {
      const left = perms[i][idx - 1];
      const right = perms[i][0];
      return prev + ppl[curr][left] + ppl[curr][right];
    }
    const left = perms[i][idx - 1];
    const right = perms[i][idx + 1];
    return prev + ppl[curr][left] + ppl[curr][right];
  }, 0);
  if (happy > max) {
    max = happy;
  }
}

console.log(ppl);

console.timeEnd("bench");

console.log(max);
