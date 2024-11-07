import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2016/01-no-time-taxicab/input.txt");
const directions = buffer.toString().split(", ");
const places = new Set();
places.add("0,0");
let x = 0;
let y = 0;
let found = false;

directions.reduce(
  (prev, cur) => {
    const rl = cur[0] === "R" ? Math.PI / 2 : -(Math.PI / 2);
    const amt = +cur.slice(1);
    const ang = +prev[2] + rl;
    let px = prev[0];
    let py = prev[1];
    for (let i = 0; i < amt; i++) {
      px = Math.round(px + Math.cos(ang));
      py = Math.round(py + Math.sin(ang));
      if (places.has(`${px},${py}`) && !found) {
        x = px;
        y = py;
        found = true;
      }
      places.add(`${px},${py}`);
    }
    return [px, py, ang];
  },
  [0, 0, Math.PI / 2]
);

console.timeEnd("bench");

console.log(Math.abs(x) + Math.abs(y));
