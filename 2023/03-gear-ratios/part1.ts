import { readFileSync } from "node:fs";

console.time("bench");

type Match = {
  val: string;
  idx: number;
};

const buffer = readFileSync("2023/03-gear-ratios/input.txt");
const input = buffer.toString().split("\n");

const digitReg = /\d+/g;
const symbolReg = /[^0-9a-zA-Z.]/g;

let sum = 0;

for (let idx = 0; idx < input.length; idx++) {
  const nums = input[idx].matchAll(digitReg);
  const matches: Match[] = Array.from(nums).map((match) => {
    return { val: match[0], idx: match.index as number };
  });
  if (matches.length === 0) {
    continue;
  }
  for (let i = 0; i < matches.length; i++) {
    if (lookAround(matches[i], idx, input)) {
      sum += parseInt(matches[i].val);
    }
  }
}

function lookAround(match: Match, idx: number, input: string[]): boolean {
  const i = match.idx;
  const endi = i + match.val.length;

  for (
    let iy = Math.max(idx - 1, 0);
    iy <= Math.min(idx + 1, input.length - 1);
    iy++
  ) {
    for (
      let ix = Math.max(i - 1, 0);
      ix <= Math.min(endi, input[idx].length - 1);
      ix++
    ) {
      if (input[iy][ix].match(symbolReg) !== null) {
        return true;
      }
    }
  }
  return false;
}

console.timeEnd("bench");

console.log(sum);
