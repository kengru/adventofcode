import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2024/09-disk-fragmenter/test-input.txt");
const parsed = buffer.toString().split("");

let id = 0;
let blocks = "";
let alternate = true;
const blks = [];

for (let i = 0; i < parsed.length; i++) {
  const v = parsed[i];
  if (alternate) {
    blocks += id.toString().repeat(+v);
    for (let i = 0; i < +v; i++) {
      blks.push(id.toString());
    }
    alternate = !alternate;
    id++;
  } else {
    blocks += ".".repeat(+v);
    for (let i = 0; i < +v; i++) {
      blks.push(".");
    }
    alternate = !alternate;
  }
}
console.log("blocks", blocks);
console.log("blocks2", blks);
// console.log("blocks", blocks.length);

function valid(m: string): boolean {
  const ch = m.split(".");
  let found = 0;
  for (let i = 0; i < ch.length; i++) {
    if (ch[i] !== "") {
      found++;
    }
  }
  return found < 2;
}

// let idx = blocks.length - 1;
// while (!valid(blocks)) {
//   if (blocks[idx] !== ".") {
//     let idx2 = 0;
//     while (idx2 < blocks.length - 1) {
//       if (blocks[idx2] === ".") {
//         blocks =
//           blocks.substring(0, idx2) + blocks[idx] + blocks.substring(idx2 + 1);
//         blocks = blocks.substring(0, idx) + "." + blocks.substring(idx + 1);
//         break;
//       }
//       idx2++;
//     }
//   }
//   idx--;
// }

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

console.log(blocks);
console.log(blks.join(""));

let total = 0;
for (let i = 0; i < blocks.length; i++) {
  if (blocks[i] !== ".") {
    total += i * +blocks[i];
  }
}

console.log(total);
// 90489586600 - too low

console.timeEnd("bench");
