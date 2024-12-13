import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2024/09-disk-fragmenter/input.txt");
const parsed = buffer.toString().split("");

let id = 0;
let alternate = true;
const blks = [];

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

function valid(m: string): boolean {
  const ch = m.split(".");
  let found = 0;
  for (let i = 0; i < ch.length; i++) {
    if (ch[i] !== "") {
      found++;
      if (found > 1) {
        return false;
      }
    }
  }
  return true;
}

let idxx = blks.length - 1;
while (!valid(blks.join(""))) {
  if (blks[idxx] !== ".") {
    let idx2 = 0;
    while (idx2 < blks.length - 1) {
      if (blks[idx2] === ".") {
        blks[idx2] = blks[idxx];
        blks[idxx] = ".";
        break;
      }
      idx2++;
    }
  }
  idxx--;
}

let total = 0;
for (let i = 0; i < blks.length; i++) {
  if (blks[i] !== ".") {
    total += i * +blks[i];
  }
}

console.log(total);

console.timeEnd("bench");
