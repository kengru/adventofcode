import { readFileSync } from "node:fs";

type Rein = {
  vel: number;
  long: number;
  rest: number;
  dist: number;
};

console.time("bench");

const buffer = readFileSync("2015/14-reindeer-olympics/input.txt");
const parsed = buffer.toString().split("\n");
const reindeers: Rein[] = [];
let max = 0;

parsed.forEach((v) => {
  const velraw = v.split(" km/s")[0];
  const vel = +velraw.split("fly ")[1];
  const longraw = v.split("km/s for ")[1];
  const long = +longraw.split(" seconds,")[0];
  const restraw = v.split("rest for ")[1];
  const rest = +restraw.split(" seconds.")[0];
  reindeers.push({ vel, long, rest, dist: 0 });
});

let count = 0;
while (count < 2503) {
  for (let i = 0; i < reindeers.length; i++) {
    const r = reindeers[i];
    let moving = true;
    let movement = 0;
    let resting = 0;
    for (let i = 0; i < 2503; i++) {
      if (movement === r.long) {
        resting = 0;
        movement = 0;
        moving = false;
      }
      if (resting === r.rest) {
        resting = 0;
        movement = 0;
        moving = true;
      }
      if (moving) {
        r.dist += r.vel;
        movement += 1;
      } else {
        resting += 1;
      }
    }
    if (r.dist > max) {
      max = r.dist;
    }
  }
  count += 1;
}

console.log(max);

console.timeEnd("bench");
