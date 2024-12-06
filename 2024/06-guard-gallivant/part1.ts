import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2024/06-guard-gallivant/input.txt");
const parsed: string[] = buffer.toString().split("\n");
const mmap: string[][] = [];
let idx = { x: 0, y: 0 };
let dir = { x: 0, y: -1 };

for (let i = 0; i < parsed.length; i++) {
  mmap.push([]);
  for (let j = 0; j < parsed[i].length; j++) {
    mmap[i].push(parsed[i][j]);
    if (parsed[i][j] !== "#" && parsed[i][j] !== ".") {
      idx.x = j;
      idx.y = i;
    }
  }
}

let mark = "^";
mmap[idx.y][idx.x] = "X";
while (true) {
  const nx = idx.x + dir.x;
  const ny = idx.y + dir.y;
  if (ny < 0 || ny > mmap.length - 1 || nx < 0 || nx > mmap[idx.y].length - 1) {
    break;
  }
  const next = mmap[ny][nx];
  if (next === "#") {
    switch (mark) {
      case "^":
        mark = ">";
        dir = { x: 1, y: 0 };
        break;
      case ">":
        mark = "v";
        dir = { x: 0, y: 1 };
        break;
      case "v":
        mark = "<";
        dir = { x: -1, y: 0 };
        break;
      case "<":
        mark = "^";
        dir = { x: 0, y: -1 };
        break;
      default:
        break;
    }
  }
  mmap[idx.y][idx.x] = "X";
  idx.x += dir.x;
  idx.y += dir.y;
}

const total = mmap.reduce((prev, cur) => {
  return (
    prev +
    cur.reduce((prev, cur) => {
      return cur === "X" ? prev + 1 : prev;
    }, 0)
  );
}, 0);

console.log(total + 1);

console.timeEnd("bench");
