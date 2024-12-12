import { readFileSync } from "node:fs";

console.time("bench");

type Coords = {
  x: number;
  y: number;
};
type CityMap = string[][];

const buffer = readFileSync("2024/08-resonant-collinearity/input.txt");
let parsed = buffer.toString().split("\n");
const originalMap: CityMap = [];
const ants = new Map<string, Coords[]>();
const antinodes = new Set<string>();
const rows = parsed.length;
const columns = parsed[0].length;

for (let i = 0; i < parsed.length; i++) {
  originalMap.push([]);
  for (let j = 0; j < parsed[i].length; j++) {
    const v = parsed[i][j];
    if (v !== ".") {
      const value = ants.get(v);
      if (!value) {
        ants.set(v, [{ x: j, y: i }]);
      } else {
        ants.set(v, [...value, { x: j, y: i }]);
      }
    }
    originalMap[i].push(v);
  }
}

for (const [_, v] of ants) {
  for (let i = 0; i < v.length - 1; i++) {
    const cv = v[i];
    for (let j = i + 1; j < v.length; j++) {
      const nv = v[j];
      const dif: Coords = {
        x: Math.abs(cv.x - nv.x),
        y: Math.abs(cv.y - nv.y),
      };
      let cvx = cv.x < nv.x ? cv.x - dif.x : cv.x + dif.x;
      let nvx = nv.x < cv.x ? nv.x - dif.x : nv.x + dif.x;
      let cvy = cv.y - dif.y;
      let nvy = nv.y + dif.y;
      while (cvx >= 0 && cvx < rows && cvy >= 0 && cvy < columns) {
        antinodes.add(`${cvx}-${cvy}`);
        cvx = cv.x < nv.x ? cvx - dif.x : cvx + dif.x;
        cvy = cvy - dif.y;
      }
      while (nvx >= 0 && nvx < rows && nvy >= 0 && nvy < columns) {
        antinodes.add(`${nvx}-${nvy}`);
        nvx = nv.x < cv.x ? nvx - dif.x : nvx + dif.x;
        nvy = nvy + dif.y;
      }
    }
  }
}

let total = antinodes.size;
for (const [_, v] of ants) {
  for (let i = 0; i < v.length; i++) {
    if (!antinodes.has(`${v[i].x}-${v[i].y}`)) {
      total += 1;
    }
  }
}

console.log(total);

console.timeEnd("bench");
