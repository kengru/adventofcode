import { readFileSync } from "node:fs";

console.time("bench");

type Match = {
  val: string;
  idx: number;
};

const buffer = readFileSync("2023/03-gear-ratios/input.txt");
const input = buffer.toString().split("\n");

const digitReg = /\d+/g;
const symbolReg = /[*]/g;

let sum = 0;

for (let idx = 0; idx < input.length; idx++) {
  const nums = input[idx].matchAll(symbolReg);
  const matches: Match[] = Array.from(nums).map((match) => {
    return { val: match[0], idx: match.index as number };
  });
  if (matches.length === 0) {
    continue;
  }
  for (let i = 0; i < matches.length; i++) {
    sum += getTwoAround(matches[i], idx, input);
  }
}

function getTwoAround(match: Match, idx: number, input: string[]) {
  let nums: number[] = [];
  for (
    let yy = Math.max(idx - 1, 0);
    yy <= Math.min(idx + 1, input.length - 1);
    yy++
  ) {
    const line = Array.from(input[yy].matchAll(digitReg));
    for (let i = 0; i < line.length; i++) {
      const idx = line[i].index as number;
      const val = line[i][0];
      if (
        (idx >= match.idx - 1 && idx <= match.idx + 1) ||
        (idx + val.length - 1 >= match.idx - 1 &&
          idx + val.length - 1 <= match.idx + 1)
      ) {
        nums.push(parseInt(val));
      }
    }
  }
  return nums.length === 2 ? nums[0] * nums[1] : 0;
}

console.timeEnd("bench");

console.log(sum);
