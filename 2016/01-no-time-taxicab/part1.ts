import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2016/01-no-time-taxicab/input.txt");
const directions = buffer.toString().split(", ");

const lastPos = directions.reduce(
  (prev, cur) => {
    const rl = cur[0] === "R" ? Math.PI / 2 : -(Math.PI / 2);
    const amt = +cur.slice(1);
    const ang = +prev[2] + rl;
    const nx = Math.round(prev[0] + amt * Math.cos(ang));
    const ny = Math.round(prev[1] + amt * Math.sin(ang));
    return [nx, ny, ang];
  },
  [0, 0, Math.PI / 2]
);

console.timeEnd("bench");

console.log(Math.abs(lastPos[0]) + Math.abs(lastPos[1]));
