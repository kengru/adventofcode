import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2015/03-perfectly-spherical/input.txt");
const movements = buffer.toString().split("");

let x = 0;
let y = 0;
const directions = new Set();

directions.add(`${x}${y}`);

movements.forEach((v) => {
  switch (v) {
    case "^":
      y += 1;
      break;
    case "v":
      y -= 1;
      break;
    case ">":
      x += 1;
      break;
    default:
      x -= 1;
      break;
  }
  directions.add(`${x}${y}`);
});

console.timeEnd("bench");

console.log(directions.size);
