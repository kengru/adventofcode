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
      const cvx = cv.x < nv.x ? cv.x - dif.x : cv.x + dif.x;
      const nvx = nv.x < cv.x ? nv.x - dif.x : nv.x + dif.x;
      const anti1: Coords = { x: cvx, y: cv.y - dif.y };
      const anti2: Coords = { x: nvx, y: nv.y + dif.y };
      if (anti1.x >= 0 && anti1.x < rows && anti1.y >= 0 && anti1.y < columns) {
        antinodes.add(`${anti1.x}-${anti1.y}`);
      }
      if (anti2.x >= 0 && anti2.x < rows && anti2.y >= 0 && anti2.y < columns) {
        antinodes.add(`${anti2.x}-${anti2.y}`);
      }
    }
  }
}

console.log(antinodes.size);

console.timeEnd("bench");
