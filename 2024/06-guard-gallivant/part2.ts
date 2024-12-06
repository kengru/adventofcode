import { readFileSync } from "node:fs";

type Poss = {
  x: number;
  y: number;
};

console.time("bench");

const buffer = readFileSync("2024/06-guard-gallivant/test-input.txt");
const parsed: string[] = buffer.toString().split("\n");
const originalMap: string[][] = [];
const positions = new Set<string>();
let idx = { x: 0, y: 0 };
let dir = { x: 0, y: -1 };

for (let i = 0; i < parsed.length; i++) {
  originalMap.push([]);
  for (let j = 0; j < parsed[i].length; j++) {
    originalMap[i].push(parsed[i][j]);
    if (parsed[i][j] !== "#" && parsed[i][j] !== ".") {
      idx.x = j;
      idx.y = i;
    }
  }
}

let mark = "^";
originalMap[idx.y][idx.x] = "X";
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
  originalMap[idx.y][idx.x] = "X";
  positions.add(`${idx.x}-${idx.y}`);
  idx.x += dir.x;
  idx.y += dir.y;
}
positions.add(`${idx.x}-${idx.y}`);

console.log(positions.size);

positions.forEach((v) => {
  const [x, y] = v.split("-");
  const mapCopy;
});

function printMap() {
  for (let i = 0; i < originalMap.length; i++) {
    console.log(originalMap[i].join(""));
  }
}

console.log();

console.timeEnd("bench");
