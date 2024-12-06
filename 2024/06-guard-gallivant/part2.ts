import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2024/06-guard-gallivant/input.txt");
const parsed: string[] = buffer.toString().split("\n");
const originalMap: string[][] = [];
const positions = new Set<string>();
let idx = { x: 0, y: 0 };
let initial = { x: 0, y: 0 };
let dir = { x: 0, y: -1 };

for (let i = 0; i < parsed.length; i++) {
  originalMap.push([]);
  for (let j = 0; j < parsed[i].length; j++) {
    originalMap[i].push(parsed[i][j]);
    if (parsed[i][j] !== "#" && parsed[i][j] !== ".") {
      idx = { x: j, y: i };
      initial = { x: j, y: i };
    }
  }
}

let mark = "^";
while (true) {
  const nx = idx.x + dir.x;
  const ny = idx.y + dir.y;
  if (
    ny < 0 ||
    ny > originalMap.length - 1 ||
    nx < 0 ||
    nx > originalMap[idx.y].length - 1
  ) {
    break;
  }
  const next = originalMap[ny][nx];
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
  positions.add(`${idx.x}-${idx.y}`);
  idx.x += dir.x;
  idx.y += dir.y;
}
positions.add(`${idx.x}-${idx.y}`);

console.log(positions.size);

function check(nm: string[][]): boolean {
  const trail = new Set<string>();
  let mark = "^";
  idx = { x: initial.x, y: initial.y };
  dir = { x: 0, y: -1 };
  trail.add(`${idx.x}-${idx.y}-${mark}`);
  while (true) {
    let nx = idx.x + dir.x;
    let ny = idx.y + dir.y;
    if (ny < 0 || ny > nm.length - 1 || nx < 0 || nx > nm[0].length - 1) {
      break;
    }
    let next = "";
    next = nm[ny][nx];
    do {
      if (next === "#" || next === "@") {
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
      if (ny < 0 || ny > nm.length - 1 || nx < 0 || nx > nm[0].length - 1) {
        break;
      }
      nx = idx.x + dir.x;
      ny = idx.y + dir.y;
      next = nm[ny][nx];
    } while (next === "#" || next === "@");
    idx.x = nx;
    idx.y = ny;
    const save = `${nx}-${ny}-${mark}`;
    if (trail.has(save)) {
      return true;
    }
    trail.add(`${nx}-${ny}-${mark}`);
  }
  return false;
}

let total = 0;
positions.forEach((v) => {
  const [x, y] = v.split("-").map((val) => +val);
  if (x === initial.x && y === initial.y) {
    return;
  }
  const mmap = JSON.parse(JSON.stringify(originalMap)) as string[][];
  mmap[y][x] = "@";
  const loop = check(mmap);
  // if (loop) {
  //   printMap(mmap);
  // }
  total += loop ? 1 : 0;
});

function printMap(mmap: string[][]) {
  console.log("map");
  for (let i = 0; i < mmap.length; i++) {
    console.log(mmap[i].join(""));
  }
}

console.log(total);

// 1617 - too high
// 1616 - too high
// 1600 - too high

console.timeEnd("bench");
