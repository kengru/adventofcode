import { readFileSync } from "node:fs";

console.time("bench");

const buffer = readFileSync("2015/14-reindeer-olympics/input.txt");
const parsed = buffer.toString().split("\n");
let max = 0;

parsed.forEach((v) => {
  const velraw = v.split(" km/s")[0];
  const vel = +velraw.split("fly ")[1];
  const longraw = v.split("km/s for ")[1];
  const long = +longraw.split(" seconds,")[0];
  const restraw = v.split("rest for ")[1];
  const rest = +restraw.split(" seconds.")[0];
  let dist = 0;
  let moving = true;
  let movement = 0;
  let resting = 0;
  for (let i = 0; i < 2503; i++) {
    if (movement === long) {
      resting = 0;
      movement = 0;
      moving = false;
    }
    if (resting === rest) {
      resting = 0;
      movement = 0;
      moving = true;
    }
    if (moving) {
      dist += vel;
      movement += 1;
    } else {
      resting += 1;
    }
  }
  if (dist > max) {
    max = dist;
  }
});

console.log(max);

console.timeEnd("bench");
