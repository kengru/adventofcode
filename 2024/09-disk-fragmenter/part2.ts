import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2024/09-disk-fragmenter/input.txt");
const parsed = buffer.toString().split("");

let id = 0;
let alternate = true;
const blks: string[] = [];

for (let i = 0; i < parsed.length; i++) {
  const v = parsed[i];
  if (alternate) {
    for (let i = 0; i < +v; i++) {
      blks.push(id.toString());
    }
    alternate = !alternate;
    id++;
  } else {
    for (let i = 0; i < +v; i++) {
      blks.push(".");
    }
    alternate = !alternate;
  }
}

let idx = blks.length - 1;
while (idx > 0) {
  const wholeFile: string[] = [];
  let before = "";
  while (
    blks[idx] !== "." &&
    idx > 0 &&
    (before === "" || before === blks[idx])
  ) {
    before = blks[idx];
    wholeFile.push(blks[idx]);
    idx--;
  }
  if (wholeFile.length > 0) {
    let space = 0;
    for (let i = 0; i <= idx; i++) {
      if (blks[i] === ".") {
        space++;
        if (wholeFile.length === space) {
          let p = 0;
          for (let j = i - wholeFile.length + 1; j < i + 1; j++) {
            blks[j] = wholeFile[0];
            blks[idx + 1 + p] = ".";
            p++;
          }
          break;
        }
      } else {
        space = 0;
      }
    }
  }
  if (wholeFile.length === 0) {
    idx--;
  }
}

let total = 0;
for (let i = 0; i < blks.length; i++) {
  if (blks[i] !== ".") {
    total += i * +blks[i];
  }
}

console.log(total);

console.timeEnd("bench");
