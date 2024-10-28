import { readFileSync } from "node:fs";

const buffer = readFileSync("2015/03-perfectly-spherical/input.txt");
const movements = buffer.toString().split("");
// const movements = "^v^v^v^v^v".split("");
let x = 0;
let y = 0;
let x2 = 0;
let y2 = 0;
let toggle = false;
const directions = new Set();
directions.add(`${x}${y}`);

movements.forEach((v) => {
  if (toggle) {
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
  } else {
    switch (v) {
      case "^":
        y2 += 1;
        break;
      case "v":
        y2 -= 1;
        break;
      case ">":
        x2 += 1;
        break;
      default:
        x2 -= 1;
        break;
    }
  }
  toggle = !toggle;
  if (!toggle) {
    directions.add(`${x}${y}`);
  } else {
    directions.add(`${x2}${y2}`);
  }
});

console.log(directions.size);
